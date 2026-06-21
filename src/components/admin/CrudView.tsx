import { useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus, Pencil, Trash2, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { useCollection, type WithId } from "@/lib/admin/storage";
import type { EntityConfig } from "@/lib/admin/schemas";
import { seeds } from "@/lib/admin/schemas";
import { toast } from "sonner";

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
  const [form, setForm] = useState<Record<string, any>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [animationParent] = useAutoAnimate();

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      config.searchable.some((k) => {
        let val = it[k];
        if (config.fields.find((f) => f.name === k)?.type === "lead_select") {
          const lead = leads.items.find((l) => l.id === val);
          val = lead ? `${lead.company} ${lead.contact}` : val;
        }
        return String(val ?? "").toLowerCase().includes(q);
      })
    );
  }, [items, query, config.searchable, config.fields, leads.items]);

  function openCreate() {
    const init: Record<string, any> = {};
    for (const f of config.fields) init[f.name] = f.type === "number" ? "" : "";
    setForm(init);
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: WithId<Record<string, any>>) {
    setForm({ ...row });
    setEditing(row);
    setOpen(true);
  }

  function submit() {
    try {
      const payload: Record<string, any> = {};
      for (const f of config.fields) {
        const v = form[f.name];
        payload[f.name] = f.type === "number" && v !== "" && v != null ? Number(v) : v ?? "";
      }
      if (editing) update(editing.id, payload);
      else create(payload);
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
          <Button variant="outline" className="rounded-full">
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
        <StatCard label="Total" value={items.length} />
        <StatCard
          label="This month"
          value={items.filter((i: any) => String(i.date || i.due || i.updated || i.start || "").slice(0, 7) === new Date().toISOString().slice(0, 7)).length}
        />
        <StatCard label="Showing" value={filtered.length} />
        <StatCard label="Updated" value={new Date().toLocaleDateString()} />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="h-9 rounded-full pl-9"
            />
          </div>
          <div className="text-xs text-muted-foreground">{filtered.length} records</div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                {config.columns.map((c) => (
                  <TableHead key={c.name} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="w-24 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody ref={animationParent as any}>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={config.columns.length + 1} className="py-12 text-center text-sm text-muted-foreground">
                    No records yet. Click "Add new" to create one.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  {config.columns.map((c) => {
                    const fieldDef = config.fields.find((f) => f.name === c.name);
                    let displayValue = row[c.name];
                    if (fieldDef?.type === "lead_select") {
                      const lead = leads.items.find((l) => l.id === displayValue);
                      displayValue = lead ? lead.company : displayValue;
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
      </div>

      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
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
                <Label htmlFor={f.name} className="text-xs font-medium">
                  {f.label} {f.required && <span className="text-rose-500">*</span>}
                </Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                    placeholder={f.placeholder}
                    rows={3}
                  />
                ) : f.type === "select" ? (
                  <Select
                    value={form[f.name] ?? ""}
                    onValueChange={(v) => setForm((p) => ({ ...p, [f.name]: v }))}
                  >
                    <SelectTrigger id={f.name}>
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
                ) : f.type === "lead_select" ? (
                  <Select
                    value={form[f.name] ?? ""}
                    onValueChange={(v) => setForm((p) => ({ ...p, [f.name]: v }))}
                  >
                    <SelectTrigger id={f.name}>
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
                ) : (
                  <Input
                    id={f.name}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "email" ? "email" : "text"}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                    placeholder={f.placeholder}
                    required={f.required}
                  />
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
                  if (confirmDelete) remove(confirmDelete);
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
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-soft">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-display text-2xl font-semibold">{value}</div>
    </div>
  );
}
