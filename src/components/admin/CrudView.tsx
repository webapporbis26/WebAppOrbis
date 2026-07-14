import { useMemo, useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus, Pencil, Trash2, Search, Download, CalendarIcon, Eye, ArrowRightLeft, Sigma, CalendarDays, Filter, Clock, ChevronDown, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { AdminDatePicker } from "@/components/admin/AdminDatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCollection, type WithId, useActivityLogger } from "@/lib/admin/storage";
import type { EntityConfig } from "@/lib/admin/schemas";
import { seeds } from "@/lib/admin/schemas";
import { toast } from "sonner";
import { dealsApi } from "@/lib/admin/api";

function badgeTone(value: string): string {
  const v = (value || "").toLowerCase();
  if (/(active|paid|published|completed|confirmed|renewed)/.test(v))
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (/(pending|new|draft|on hold|contacted|requirements)/.test(v))
    return "bg-amber-100 text-amber-700 border-amber-200";
  if (/(expiring|review|revision|quotation)/.test(v))
    return "bg-sky-100 text-sky-700 border-sky-200";
  if (/(progress|invoiced)/.test(v))
    return "bg-indigo-100 text-indigo-700 border-indigo-200";
  if (/(overdue|expired|cancelled|closed|inactive)/.test(v))
    return "bg-rose-100 text-rose-700 border-rose-200";
  if (/(on leave)/.test(v))
    return "bg-violet-100 text-violet-700 border-violet-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function formatCell(field: string, value: any): string {
  if (value == null || value === "") return "—";
  if (typeof value === "number" && /amount|total|advance/i.test(field))
    return `₹${Number(value).toLocaleString()}`;
  return String(value);
}

export function CrudView({ config }: { config: EntityConfig }) {
  const { items, create, update, remove } = useCollection<Record<string, any>>(
    config.storageKey,
    (seeds[config.storageKey] as WithId<Record<string, any>>[]) || []
  );
  
  const leads = useCollection<Record<string, any>>(
    "wo_admin_leads",
    (seeds["wo_admin_leads"] as WithId<Record<string, any>>[]) || []
  );

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<WithId<Record<string, any>> | null>(null);
  const [viewing, setViewing] = useState<WithId<Record<string, any>> | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmConvert, setConfirmConvert] = useState<any | null>(null);
  const [animationParent] = useAutoAnimate();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const logActivity = useActivityLogger();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filterableField = useMemo(() => config.fields.find(f => f.name.toLowerCase().includes("status") || config.columns.find(c => c.name === f.name)?.badge), [config]);
  const filterOptions = useMemo(() => {
    if (!filterableField) return [];
    const opts = new Set<string>();
    items.forEach(it => {
      if (it[filterableField.name]) opts.add(String(it[filterableField.name]));
    });
    return Array.from(opts).sort();
  }, [items, filterableField]);

  const filtered = useMemo(() => {
    let result = items;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((it) =>
        config.searchable.some((k) => {
          let val = it[k];
          if (config.fields.find((f) => f.name === k)?.type === "lead_select") {
            const lead = leads.items.find((l) => l.id === val);
            val = lead ? `${lead.company} ${lead.contact}` : val;
          }
          return String(val ?? "").toLowerCase().includes(q);
        })
      );
    }
    
    if (filterableField && activeFilter !== "all") {
       result = result.filter(it => String(it[filterableField.name]) === activeFilter);
    }

    if (sortConfig) {
      result = [...result].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        
        if (config.fields.find(f => f.name === sortConfig.key)?.type === "lead_select") {
           valA = leads.items.find(l => l.id === valA)?.company || valA;
           valB = leads.items.find(l => l.id === valB)?.company || valB;
        }
        
        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, query, config.searchable, config.fields, leads.items, sortConfig, filterableField, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, activeFilter, sortConfig]);

  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);
  const totalPages = Math.ceil(filtered.length / pageSize);

  function toggleSort(key: string) {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  function exportToCSV() {
    if (filtered.length === 0) return toast.error("No records to export");
    const headers = config.columns.map((c) => c.label).join(",");
    const rows = filtered.map((row) => {
      return config.columns
        .map((c) => {
          let val = row[c.name];
          if (config.fields.find((f) => f.name === c.name)?.type === "lead_select") {
            const lead = leads.items.find((l) => l.id === val);
            val = lead ? `${lead.company} - ${lead.contact}` : (val === "0" || val === 0 ? "" : val);
          }
          return `"${String(val ?? "").replace(/"/g, '""')}"`;
        })
        .join(",");
    });
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${config.key}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export successful");
  }

  function convertToDeal(row: any) {
    setConfirmConvert(row);
  }

  async function handleConvertConfirm() {
    if (!confirmConvert) return;
    const row = confirmConvert;
    try {
      const dealPayload = {
         id: 0,
         leadId: row.id,
         project: `${row.company} Project`,
         total: row.budget || 0,
         advance: 0,
         type: row.service || 'Static Website',
         stage: 'New Deal',
         status: 'In Progress',
         due: '',
         remarks: row.notes || ''
      };
      await dealsApi.addOrUpdate(dealPayload);
      update(row.id, { ...row, status: "Converted" });
      logActivity("Converted", `Lead ${row.company} converted to Deal`);
      toast.success("Lead converted to Deal!");
    } catch(err) {
      toast.error("Failed to convert lead");
    } finally {
      setConfirmConvert(null);
    }
  }

  function openCreate() {
    const init: Record<string, any> = {};
    for (const f of config.fields) init[f.name] = f.type === "number" ? "" : "";
    setForm(init);
    setErrors({});
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: WithId<Record<string, any>>) {
    setForm({ ...row });
    setErrors({});
    setEditing(row);
    setOpen(true);
  }

  function submit() {
    try {
      const payload: Record<string, any> = {};
      const newErrors: Record<string, string> = {};
      
      for (const f of config.fields) {
        const v = form[f.name];
        
        // Custom Validation
        if (f.required && (v === undefined || v === "" || v === null)) {
          newErrors[f.name] = `${f.label} is required`;
        } else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) {
          newErrors[f.name] = `Invalid email format`;
        } else if (v && f.name.toLowerCase().includes("phone") && !/^\+?\d{7,15}$/.test(String(v))) {
          newErrors[f.name] = `Invalid phone number format`;
        } else if (f.type === "number" && v !== "" && v != null && isNaN(Number(v))) {
          newErrors[f.name] = `Must be a valid number`;
        }

        payload[f.name] = f.type === "number" && v !== "" && v != null ? Number(v) : v ?? "";
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fix the errors in the form.");
        return;
      }
      
      setErrors({});
      if (editing) {
        update(editing.id, payload);
        logActivity("Updated", `${config.title} Record: ${payload[config.columns[0].name] || 'Unknown'}`);
      } else {
        create(payload);
        logActivity("Created", `${config.title} Record: ${payload[config.columns[0].name] || 'Unknown'}`);
      }
      setOpen(false);
      toast.success(editing ? `${config.title} updated successfully` : `${config.title} created successfully`);
    } catch (error) {
      toast.error(`Failed to save ${config.title}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-display text-3xl font-semibold sm:text-4xl">{config.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{config.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button
            onClick={openCreate}
            className="rounded-full text-primary-foreground"
            style={{ background: "var(--grad-primary)" }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total" value={items.length} icon={Sigma} />
        <StatCard
          label="This month"
          value={items.filter((i: any) => String(i.date || i.due || i.updated || i.start || "").slice(0, 7) === new Date().toISOString().slice(0, 7)).length}
          icon={CalendarDays}
        />
        <StatCard label="Showing" value={paginated.length} icon={Filter} />
        <StatCard label="Updated" value={new Date().toLocaleDateString()} icon={Clock} />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="h-9 w-[200px] rounded-full pl-9 sm:w-[250px]"
              />
            </div>
            {filterableField && filterOptions.length > 0 && (
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger className="h-9 w-[140px] rounded-full bg-muted/30">
                  <SelectValue placeholder="Filter..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {filterOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="hidden text-xs text-muted-foreground sm:block">{filtered.length} records</div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-12 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  S.No
                </TableHead>
                {config.columns.map((c) => (
                  <TableHead 
                    key={c.name} 
                    className="cursor-pointer text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => toggleSort(c.name)}
                  >
                    <div className="flex items-center gap-1.5">
                      {c.label}
                      {sortConfig?.key === c.name && (
                        <span className="text-[10px] text-primary">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-24 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody ref={animationParent as any}>
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={config.columns.length + 2} className="py-12 text-center text-sm text-muted-foreground">
                    No records yet. Click "Add new" to create one.
                  </TableCell>
                </TableRow>
              )}
              {paginated.map((row, index) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  <TableCell className="text-sm font-medium text-muted-foreground">
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                  {config.columns.map((c) => {
                    const fieldDef = config.fields.find((f) => f.name === c.name);
                    let displayValue = row[c.name];
                    if (fieldDef?.type === "lead_select") {
                      const lead = leads.items.find((l) => l.id === displayValue);
                      displayValue = lead ? lead.company : (displayValue === "0" || displayValue === 0 ? "" : displayValue);
                    }
                    return (
                      <TableCell key={c.name} className="text-sm">
                        {c.badge ? (
                          <Badge variant="outline" className={`rounded-full border ${badgeTone(String(displayValue ?? ""))}`}>
                            {formatCell(c.name, displayValue)}
                          </Badge>
                        ) : (
                          <span className="line-clamp-1">{formatCell(c.name, displayValue)}</span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {config.key === "leads" && row.status !== "Converted" && (
                         <Button size="icon" variant="ghost" title="Convert to Deal" className="h-8 w-8 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => convertToDeal(row)}>
                           <ArrowRightLeft className="h-3.5 w-3.5" />
                         </Button>
                      )}
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground" onClick={() => setViewing(row)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => openEdit(row)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setConfirmDelete(row.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex flex-col gap-4 border-t border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages || 1}
            </div>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-8 px-3 rounded-md" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                Prev
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3 rounded-md" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages || totalPages === 0}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-display text-2xl">
              {editing ? "Edit" : "Add"} {config.title.replace(/s$/, "")}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below and save to {editing ? "update" : "create"} the record.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2"
          >
            {config.fields.map((f) => (
              <div key={f.name} className={`space-y-1.5 ${f.full ? "sm:col-span-2" : ""}`}>
                <Label htmlFor={f.name} className={`text-xs font-medium ${errors[f.name] ? "text-rose-500" : ""}`}>
                  {f.label} {f.required && <span className="text-rose-500">*</span>}
                </Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    value={form[f.name] ?? ""}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, [f.name]: e.target.value }));
                      if (errors[f.name]) setErrors(p => ({ ...p, [f.name]: "" }));
                    }}
                    placeholder={f.placeholder}
                    rows={3}
                    className={errors[f.name] ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                  />
                ) : f.type === "select" ? (
                  <Select
                    value={form[f.name] ?? ""}
                    onValueChange={(v) => {
                      setForm((p) => ({ ...p, [f.name]: v }));
                      if (errors[f.name]) setErrors(p => ({ ...p, [f.name]: "" }));
                    }}
                  >
                    <SelectTrigger id={f.name} className={errors[f.name] ? "border-rose-500 focus:ring-rose-500" : ""}>
                      <SelectValue placeholder={`Select ${f.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "multiselect" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={f.name}
                        variant="outline"
                        className={`w-full justify-between text-left font-normal hover:bg-background ${errors[f.name] ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                      >
                        <span className="truncate">
                          {form[f.name] && String(form[f.name]).trim() !== ""
                            ? String(form[f.name])
                            : `Select ${f.label.toLowerCase()}`}
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-55" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-3" align="start">
                      <div className="space-y-2">
                        {f.options?.map((opt) => {
                          const currentValues = form[f.name]
                            ? String(form[f.name]).split(",").map((s: string) => s.trim()).filter(Boolean)
                            : [];
                          const checked = currentValues.includes(opt);
                          return (
                            <label
                              key={opt}
                              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-muted/50 cursor-pointer text-sm font-medium"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(val) => {
                                  let newValues;
                                  if (val) {
                                    newValues = [...currentValues, opt];
                                  } else {
                                    newValues = currentValues.filter((v: string) => v !== opt);
                                  }
                                  setForm((p) => ({ ...p, [f.name]: newValues.join(", ") }));
                                }}
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : f.type === "lead_select" ? (
                  <Select
                    value={form[f.name] ? String(form[f.name]) : ""}
                    onValueChange={(v) => {
                      setForm((p) => ({ ...p, [f.name]: v }));
                      if (errors[f.name]) setErrors(p => ({ ...p, [f.name]: "" }));
                    }}
                  >
                    <SelectTrigger id={f.name} className={errors[f.name] ? "border-rose-500 focus:ring-rose-500" : ""}>
                      <SelectValue placeholder={`Select ${f.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.items.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.company} - {lead.contact} ({lead.service})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "date" ? (
                  <AdminDatePicker
                    id={f.name}
                    value={form[f.name] ?? ""}
                    onChange={(val) => {
                      setForm((p) => ({ ...p, [f.name]: val }));
                      if (errors[f.name]) setErrors(p => ({ ...p, [f.name]: "" }));
                    }}
                  />
                ) : (
                  <div className="flex gap-2">
                    <Input
                      id={f.name}
                      type={f.type === "number" ? "number" : f.type === "email" ? "email" : "text"}
                      value={form[f.name] ?? ""}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, [f.name]: e.target.value }));
                        if (errors[f.name]) setErrors(p => ({ ...p, [f.name]: "" }));
                      }}
                      placeholder={f.placeholder}
                      className={errors[f.name] ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                    />
                    {f.name === "quotationDocumentUrl" && form[f.name] && (
                      <a
                        href={form[f.name].startsWith('http') ? form[f.name] : `https://${form[f.name]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0"
                        title="Open Link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
                
                {errors[f.name] && (
                  <p className="text-xs font-medium text-rose-500 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors[f.name]}
                  </p>
                )}
              </div>
            ))}

            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="text-primary-foreground" style={{ background: "var(--grad-primary)" }}>
                {editing ? "Save changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-4xl p-0 sm:rounded-[2rem]" onInteractOutside={(e) => e.preventDefault()}>
          {/* Header section with gradient */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-8 pb-6 pt-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
            <DialogHeader>
              <DialogTitle className="text-display text-3xl">
                {viewing?.[config.columns[0].name] || `View ${config.title.replace(/s$/, "")}`}
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-base">
                {config.title.replace(/s$/, "")} Details
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {config.fields.map((f) => {
                let displayValue = viewing?.[f.name];
                if (displayValue && f.type === "date") {
                  displayValue = format(new Date(displayValue), "PPP");
                } else if (f.type === "lead_select") {
                  const lead = leads.items.find((l) => l.id === displayValue);
                  if (lead) displayValue = `${lead.company} - ${lead.contact}`;
                }
                
                const isBadge = config.columns.find((c) => c.name === f.name)?.badge;

                return (
                  <div key={f.name} className={`group flex flex-col justify-center rounded-2xl border border-border/40 bg-slate-50/50 px-4 py-2.5 transition-colors hover:bg-slate-50 ${f.full ? "sm:col-span-2" : ""}`}>
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      {f.label}
                    </Label>
                    <div className="mt-1.5 text-sm font-medium text-foreground">
                      {isBadge && displayValue ? (
                        <Badge variant="outline" className={`rounded-full border px-2.5 py-0.5 font-medium ${badgeTone(String(displayValue))}`}>
                          {formatCell(f.name, displayValue)}
                        </Badge>
                      ) : (
                        displayValue || "—"
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="button" variant="outline" className="rounded-full px-8" onClick={() => setViewing(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirmDelete} onOpenChange={(v) => !v && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete record?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The record will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() => {
                try {
                  if (confirmDelete) {
                    remove(confirmDelete);
                    logActivity("Deleted", `${config.title} Record`);
                  }
                  setConfirmDelete(null);
                  toast.success(`${config.title} deleted successfully`);
                } catch (error) {
                  toast.error(`Failed to delete ${config.title}`);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!confirmConvert} onOpenChange={(v) => !v && setConfirmConvert(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Convert to Deal?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to convert the lead <strong>{confirmConvert?.company}</strong> to a new Deal? This will create a new record in the Deals section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleConvertConfirm}
            >
              Convert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon?: any }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant dark:bg-card">
      {Icon && <Icon className="absolute -right-3 -top-3 h-16 w-16 text-primary/5 transition-transform group-hover:scale-110" />}
      <div className="relative flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
      <div className="relative mt-2 text-display text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
