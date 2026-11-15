import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Printer, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { QuotationDocument } from "@/components/admin/QuotationDocument";
import { useAdminAuth } from "@/lib/admin/auth";
import { useCollection } from "@/lib/admin/storage";
import {
  MBWS_TAX_TREATMENTS,
  PAYMENT_TERMS,
  PACKAGES,
  TEMPLATES,
  blankQuotation,
  deleteQuotation,
  formatDateLong,
  formatINR,
  isMbwsTemplate,
  loadQuotations,
  mbwsDefaultsFor,
  mbwsMonthlyItemLabel,
  mbwsPricing,
  quotationGst,
  quotationSubtotal,
  quotationTotal,
  saveQuotation,
  type Quotation,
  type QuotationItem,
} from "@/lib/admin/quotations";

export const Route = createFileRoute("/admin/quotations")({
  component: QuotationsPage,
});

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";
const labelCls = "mb-1.5 block text-sm font-semibold text-slate-700";

const statusTone: Record<Quotation["status"], string> = {
  Draft: "bg-slate-100 text-slate-600",
  Sent: "bg-blue-50 text-blue-700",
  Confirmed: "bg-emerald-50 text-emerald-700",
};

function QuotationsPage() {
  const { isSuperAdmin } = useAdminAuth();
  const [list, setList] = useState<Quotation[]>(() => loadQuotations());
  const [draft, setDraft] = useState<Quotation | null>(null);
  const [clientSource, setClientSource] = useState<string>("");
  const { items: leads, update: updateLead } = useCollection<Record<string, any>>("wo_admin_leads");
  const printQueued = useRef(false);

  // MBWS templates and saved MBWS records are super-admin only. The section
  // itself stays visible to all admins; only the MBWS surface is gated.
  const visibleTemplates = TEMPLATES.filter((t) => isSuperAdmin || !t.superAdminOnly);
  const visibleList = isSuperAdmin ? list : list.filter((q) => !isMbwsTemplate(q.templateId));
  const isMbws = draft ? isMbwsTemplate(draft.templateId) : false;
  const isMbwsStandard = draft?.templateId === "mbws-standard";
  const isMbwsMonthly =
    draft?.templateId === "mbws-digital-marketing" || draft?.templateId === "mbws-seo";

  const cloneQuotation = (q: Quotation): Quotation => ({
    ...q,
    items: q.items.map((i) => ({ ...i })),
    scopeRows: (q.scopeRows ?? []).map((r) => ({ ...r })),
    renewalRows: (q.renewalRows ?? []).map((r) => ({ ...r })),
  });

  // Print only after the portal has rendered the requested document.
  useEffect(() => {
    if (printQueued.current && draft) {
      printQueued.current = false;
      const t = window.setTimeout(() => window.print(), 150);
      return () => window.clearTimeout(t);
    }
  }, [draft]);

  const set = <K extends keyof Quotation>(key: K, value: Quotation[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const startNew = () => {
    setDraft(blankQuotation());
    setClientSource("");
    window.scrollTo({ top: 0 });
  };

  const openForEdit = (q: Quotation) => {
    if (isMbwsTemplate(q.templateId) && !isSuperAdmin) {
      toast.error("MBWS quotations are visible to super admins only.");
      return;
    }
    setDraft(cloneQuotation(q));
    setClientSource("");
    window.scrollTo({ top: 0 });
  };

  const printQuotation = (q: Quotation) => {
    if (isMbwsTemplate(q.templateId) && !isSuperAdmin) {
      toast.error("MBWS quotations are visible to super admins only.");
      return;
    }
    printQueued.current = true;
    setDraft(cloneQuotation(q));
  };

  const onTemplateChange = (templateId: Quotation["templateId"]) => {
    if (isMbwsTemplate(templateId) && !isSuperAdmin) return;
    setDraft((d) => {
      if (!d) return d;
      const next = { ...d, templateId, ...mbwsDefaultsFor(templateId, d) };
      if (templateId === "mbws-digital-marketing" || templateId === "mbws-seo") {
        // The monthly fee is the single charge — keep the line item in sync
        // so totals, validation and the saved-list total all work.
        const fee = Number(next.monthlyFee) || 0;
        next.items = [{ description: mbwsMonthlyItemLabel(templateId), amount: fee }];
        next.gstEnabled = false;
      }
      return next;
    });
  };

  const onMonthlyFeeChange = (fee: number) => {
    setDraft((d) => {
      if (!d) return d;
      return {
        ...d,
        monthlyFee: fee,
        items: [{ description: mbwsMonthlyItemLabel(d.templateId), amount: fee }],
      };
    });
  };

  const onClientChange = (value: string) => {
    setClientSource(value);
    if (!value) return;
    const lead = leads.find((l) => l.id === value);
    if (!lead) return; // manual entry — keep typed values
    setDraft((d) =>
      d
        ? {
            ...d,
            clientName: lead.company || "",
            contactPerson: lead.contact || "",
            email: lead.email || "",
            phone: lead.phone || "",
            address: lead.address || "",
            business: lead.business || "",
          }
        : d,
    );
  };

  const onPackageChange = (packageId: string) => {
    if (!packageId) {
      setDraft((d) => (d ? { ...d, packageId: "", items: [] } : d));
      return;
    }
    const pkg = PACKAGES.find((p) => p.id === packageId);
    if (!pkg) return;
    setDraft((d) =>
      d ? { ...d, packageId, items: pkg.items.map((i) => ({ ...i, qty: 1, rate: i.amount })) } : d,
    );
  };

  const onSave = () => {
    if (!draft) return;
    if (!draft.clientName.trim()) {
      toast.error("Client name is required.");
      return;
    }
    if (draft.items.length === 0) {
      toast.error("Add at least one line item.");
      return;
    }
    const next = saveQuotation(draft);
    setList(next);
    const saved = next.find((x) => x.id === draft.id);
    if (saved) setDraft(saved);
    // Keep the lead in sync — a saved quotation means a quotation was sent.
    const lead = leads.find((l) => l.company === draft.clientName);
    if (lead && lead.status !== "Quotation Sent") {
      updateLead(lead.id, { ...lead, status: "Quotation Sent" }).catch(() => undefined);
    }
    toast.success(`Quotation ${saved?.number ?? "saved"} saved.`);
  };

  const onDelete = (q: Quotation) => {
    if (isMbwsTemplate(q.templateId) && !isSuperAdmin) {
      toast.error("MBWS quotations are visible to super admins only.");
      return;
    }
    if (!window.confirm(`Delete quotation ${q.number || q.clientName}?`)) return;
    setList(deleteQuotation(q.id));
    if (draft?.id === q.id) setDraft(null);
    toast.success("Quotation deleted.");
  };

  const subtotal = draft ? quotationSubtotal(draft) : 0;
  const gst = draft ? quotationGst(draft) : 0;
  const total = draft ? quotationTotal(draft) : 0;
  const mbwsTotals = draft ? mbwsPricing({ ...draft, discount: draft.discount ?? 0 }) : null;

  // MBWS Standard rows carry qty × rate; the amount always follows them.
  const updateMbwsItem = (i: number, patch: Partial<QuotationItem>) => {
    if (!draft) return;
    set(
      "items",
      draft.items.map((x, xi) => {
        if (xi !== i) return x;
        const next = { ...x, ...patch };
        const qty = next.qty ?? 1;
        const rate = next.rate ?? next.amount;
        return { ...next, qty, rate, amount: qty * rate };
      }),
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Quotations</h1>
          <p className="mt-1 text-sm text-slate-500">
            Build quotations &amp; MoUs from templates — client, package and payment terms from dropdowns, then print
            a neat PDF.
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          style={{ background: "var(--grad-primary)" }}
        >
          <Plus className="h-4 w-4" /> New Quotation
        </button>
      </div>

      {draft && (
        <div className="mb-8 grid gap-6 xl:grid-cols-12">
          {/* ============ Builder form ============ */}
          <div className="space-y-5 xl:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {draft.number ? `Edit ${draft.number}` : "New Quotation"}
                </h2>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  aria-label="Close builder"
                  className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelCls} htmlFor="q-template">
                    Template
                  </label>
                  <select
                    id="q-template"
                    className={inputCls}
                    value={draft.templateId}
                    onChange={(e) => onTemplateChange(e.target.value as Quotation["templateId"])}
                  >
                    {visibleTemplates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-400">
                    {TEMPLATES.find((t) => t.id === draft.templateId)?.hint}
                  </p>
                </div>

                <div>
                  <label className={labelCls} htmlFor="q-client">
                    Client (from Leads)
                  </label>
                  <select
                    id="q-client"
                    className={inputCls}
                    value={clientSource}
                    onChange={(e) => onClientChange(e.target.value)}
                  >
                    <option value="">— Manual entry —</option>
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.company}
                        {l.contact ? ` — ${l.contact}` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="q-company">
                      Company / Name *
                    </label>
                    <input
                      id="q-company"
                      className={inputCls}
                      value={draft.clientName}
                      onChange={(e) => set("clientName", e.target.value)}
                      placeholder="NINAV"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-contact">
                      Contact Person
                    </label>
                    <input
                      id="q-contact"
                      className={inputCls}
                      value={draft.contactPerson}
                      onChange={(e) => set("contactPerson", e.target.value)}
                      placeholder="Bilal"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-email">
                      Email
                    </label>
                    <input
                      id="q-email"
                      type="email"
                      className={inputCls}
                      value={draft.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="info@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-phone">
                      Phone
                    </label>
                    <input
                      id="q-phone"
                      className={inputCls}
                      value={draft.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="7034633897"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="q-address">
                    Address / Business
                  </label>
                  <input
                    id="q-address"
                    className={inputCls}
                    value={draft.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Address"
                  />
                  <input
                    className={`${inputCls} mt-2`}
                    value={draft.business}
                    onChange={(e) => set("business", e.target.value)}
                    placeholder="Business — e.g. Spices & Food Products"
                  />
                </div>

                {isMbws && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls} htmlFor="q-project">
                        Project / Service Name
                      </label>
                      <input
                        id="q-project"
                        className={inputCls}
                        value={draft.projectName ?? ""}
                        onChange={(e) => set("projectName", e.target.value)}
                        placeholder="e.g. Company Website Development"
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="q-category">
                        Category
                      </label>
                      <input
                        id="q-category"
                        className={inputCls}
                        value={draft.category ?? ""}
                        onChange={(e) => set("category", e.target.value)}
                        placeholder="e.g. Website Development"
                      />
                    </div>
                  </div>
                )}

                {isMbwsStandard && (
                  <>
                    <div>
                      <label className={labelCls} htmlFor="q-gstin">
                        Client GSTIN (if applicable)
                      </label>
                      <input
                        id="q-gstin"
                        className={inputCls}
                        value={draft.gstin ?? ""}
                        onChange={(e) => set("gstin", e.target.value)}
                        placeholder="GSTIN"
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="q-objectives">
                        Project Objectives
                      </label>
                      <textarea
                        id="q-objectives"
                        rows={2}
                        className={`${inputCls} resize-none`}
                        value={draft.projectObjectives ?? ""}
                        onChange={(e) => set("projectObjectives", e.target.value)}
                        placeholder="Key goals and expected outcomes"
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Scope of Work</span>
                        <button
                          type="button"
                          onClick={() =>
                            set("scopeRows", [...(draft.scopeRows ?? []), { feature: "", description: "" }])
                          }
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add row
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(draft.scopeRows ?? []).map((r, i) => (
                          <div key={i} className="grid grid-cols-[1fr_1fr_32px] gap-2">
                            <input
                              className={inputCls}
                              value={r.feature}
                              onChange={(e) =>
                                set(
                                  "scopeRows",
                                  (draft.scopeRows ?? []).map((x, xi) =>
                                    xi === i ? { ...x, feature: e.target.value } : x,
                                  ),
                                )
                              }
                              placeholder="Page / Module / Feature"
                            />
                            <input
                              className={inputCls}
                              value={r.description}
                              onChange={(e) =>
                                set(
                                  "scopeRows",
                                  (draft.scopeRows ?? []).map((x, xi) =>
                                    xi === i ? { ...x, description: e.target.value } : x,
                                  ),
                                )
                              }
                              placeholder="Description / Deliverable"
                            />
                            <button
                              type="button"
                              aria-label="Remove scope row"
                              onClick={() =>
                                set("scopeRows", (draft.scopeRows ?? []).filter((_, xi) => xi !== i))
                              }
                              className="grid h-10 w-8 place-items-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {!isMbwsMonthly && (
                <div>
                  <label className={labelCls} htmlFor="q-package">
                    Service Package
                  </label>
                  <select
                    id="q-package"
                    className={inputCls}
                    value={draft.packageId}
                    onChange={(e) => onPackageChange(e.target.value)}
                  >
                    <option value="">— Select a package —</option>
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                )}

                {isMbwsMonthly ? (
                  <div>
                    <label className={labelCls} htmlFor="q-fee">
                      Monthly Fee (₹)
                    </label>
                    <input
                      id="q-fee"
                      className={inputCls}
                      type="number"
                      min={0}
                      value={draft.monthlyFee || ""}
                      onChange={(e) => onMonthlyFeeChange(Number(e.target.value) || 0)}
                      placeholder="₹ per month"
                    />
                    <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm">
                      <div className="flex justify-between text-base font-bold text-slate-900">
                        <span>Quotation Total</span>
                        <span>
                          {formatINR(draft.monthlyFee || 0)} per month
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Line Items</span>
                      <button
                        type="button"
                        onClick={() =>
                          set("items", [
                            ...draft.items,
                            isMbwsStandard
                              ? { description: "", amount: 0, qty: 1, rate: 0 }
                              : { description: "", amount: 0 },
                          ])
                        }
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add item
                      </button>
                    </div>
                    <div className="space-y-2">
                      {draft.items.map((it, i) =>
                        isMbwsStandard ? (
                          <div key={i} className="grid grid-cols-[1fr_56px_96px_96px_32px] gap-2">
                            <input
                              className={inputCls}
                              value={it.description}
                              onChange={(e) => updateMbwsItem(i, { description: e.target.value })}
                              placeholder="Service / deliverable"
                            />
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              value={it.qty ?? 1}
                              onChange={(e) => updateMbwsItem(i, { qty: Number(e.target.value) || 0 })}
                              placeholder="Qty"
                              aria-label="Quantity"
                            />
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              value={it.rate ?? ""}
                              onChange={(e) => updateMbwsItem(i, { rate: Number(e.target.value) || 0 })}
                              placeholder="Rate ₹"
                              aria-label="Rate"
                            />
                            <input
                              className={`${inputCls} bg-slate-50`}
                              value={formatINR(it.amount)}
                              readOnly
                              aria-label="Amount"
                            />
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => set("items", draft.items.filter((_, xi) => xi !== i))}
                              className="grid h-10 w-8 place-items-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div key={i} className="grid grid-cols-[1fr_110px_32px] gap-2">
                            <input
                              className={inputCls}
                              value={it.description}
                              onChange={(e) =>
                                set(
                                  "items",
                                  draft.items.map((x, xi) => (xi === i ? { ...x, description: e.target.value } : x)),
                                )
                              }
                              placeholder="Work description"
                            />
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              value={it.amount || ""}
                              onChange={(e) =>
                                set(
                                  "items",
                                  draft.items.map((x, xi) =>
                                    xi === i ? { ...x, amount: Number(e.target.value) || 0 } : x,
                                  ),
                                )
                              }
                              placeholder="₹"
                            />
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => set("items", draft.items.filter((_, xi) => xi !== i))}
                              className="grid h-10 w-8 place-items-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                    {isMbwsStandard && mbwsTotals ? (
                      <div className="mt-3 space-y-1 rounded-2xl bg-slate-50 p-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-medium">{formatINR(mbwsTotals.subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500">Discount</span>
                          <input
                            type="number"
                            min={0}
                            value={draft.discount || ""}
                            onChange={(e) => set("discount", Number(e.target.value) || 0)}
                            className="w-28 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="₹"
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Taxable Amount</span>
                          <span className="font-medium">{formatINR(mbwsTotals.taxable)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <label className="flex items-center gap-2 text-slate-500">
                            <input
                              type="checkbox"
                              checked={draft.gstEnabled}
                              onChange={(e) => set("gstEnabled", e.target.checked)}
                              className="h-4 w-4 accent-blue-600"
                            />
                            GST
                          </label>
                          <span className="flex items-center gap-1">
                            <input
                              type="number"
                              min={0}
                              max={28}
                              value={draft.gstRate}
                              disabled={!draft.gstEnabled}
                              onChange={(e) => set("gstRate", Number(e.target.value) || 0)}
                              className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-500">% · {formatINR(mbwsTotals.gst)}</span>
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold text-slate-900">
                          <span>Grand Total</span>
                          <span>{formatINR(mbwsTotals.total)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 space-y-1 rounded-2xl bg-slate-50 p-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-medium">{formatINR(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <label className="flex items-center gap-2 text-slate-500">
                            <input
                              type="checkbox"
                              checked={draft.gstEnabled}
                              onChange={(e) => set("gstEnabled", e.target.checked)}
                              className="h-4 w-4 accent-blue-600"
                            />
                            GST
                          </label>
                          <span className="flex items-center gap-1">
                            <input
                              type="number"
                              min={0}
                              max={28}
                              value={draft.gstRate}
                              disabled={!draft.gstEnabled}
                              onChange={(e) => set("gstRate", Number(e.target.value) || 0)}
                              className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-500">% · {formatINR(gst)}</span>
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold text-slate-900">
                          <span>Total</span>
                          <span>{formatINR(total)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isMbwsStandard && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls} htmlFor="q-taxtreat">
                          Tax Treatment
                        </label>
                        <select
                          id="q-taxtreat"
                          className={inputCls}
                          value={draft.taxTreatment ?? MBWS_TAX_TREATMENTS[0]}
                          onChange={(e) => set("taxTreatment", e.target.value)}
                        >
                          {MBWS_TAX_TREATMENTS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="q-words">
                          Amount in Words
                        </label>
                        <input
                          id="q-words"
                          className={inputCls}
                          value={draft.amountInWords ?? ""}
                          onChange={(e) => set("amountInWords", e.target.value)}
                          placeholder="e.g. Fifty-three thousand rupees only"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                          Domain, Hosting &amp; Renewal Charges
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            set("renewalRows", [
                              ...(draft.renewalRows ?? []),
                              { service: "", firstYear: "", renewal: "" },
                            ])
                          }
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add row
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(draft.renewalRows ?? []).map((r, i) => (
                          <div key={i} className="grid grid-cols-[1fr_1fr_1fr_32px] gap-2">
                            <input
                              className={inputCls}
                              value={r.service}
                              onChange={(e) =>
                                set(
                                  "renewalRows",
                                  (draft.renewalRows ?? []).map((x, xi) =>
                                    xi === i ? { ...x, service: e.target.value } : x,
                                  ),
                                )
                              }
                              placeholder="Service"
                            />
                            <input
                              className={inputCls}
                              value={r.firstYear}
                              onChange={(e) =>
                                set(
                                  "renewalRows",
                                  (draft.renewalRows ?? []).map((x, xi) =>
                                    xi === i ? { ...x, firstYear: e.target.value } : x,
                                  ),
                                )
                              }
                              placeholder="First Year — Included / ₹"
                            />
                            <input
                              className={inputCls}
                              value={r.renewal}
                              onChange={(e) =>
                                set(
                                  "renewalRows",
                                  (draft.renewalRows ?? []).map((x, xi) =>
                                    xi === i ? { ...x, renewal: e.target.value } : x,
                                  ),
                                )
                              }
                              placeholder="Annual Renewal — ₹"
                            />
                            <button
                              type="button"
                              aria-label="Remove renewal row"
                              onClick={() =>
                                set("renewalRows", (draft.renewalRows ?? []).filter((_, xi) => xi !== i))
                              }
                              className="grid h-10 w-8 place-items-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls} htmlFor="q-timeline">
                          Estimated Duration (working days)
                        </label>
                        <input
                          id="q-timeline"
                          className={inputCls}
                          type="number"
                          min={0}
                          value={draft.timelineDays ?? ""}
                          onChange={(e) => set("timelineDays", Number(e.target.value) || undefined)}
                          placeholder="e.g. 15"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="q-support">
                        Support &amp; Maintenance
                      </label>
                      <textarea
                        id="q-support"
                        rows={2}
                        className={`${inputCls} resize-none`}
                        value={draft.supportText ?? ""}
                        onChange={(e) => set("supportText", e.target.value)}
                        placeholder="Included post-launch support period, coverage, response expectations — or state clearly if none is included."
                      />
                    </div>
                  </>
                )}

                {isMbws ? (
                  <div>
                    <label className={labelCls} htmlFor="q-advance">
                      Advance Payment (%)
                    </label>
                    <input
                      id="q-advance"
                      className={inputCls}
                      type="number"
                      min={0}
                      max={100}
                      value={draft.advancePercent ?? 50}
                      onChange={(e) => set("advancePercent", Number(e.target.value) || 0)}
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Balance {100 - (draft.advancePercent ?? 50)}% as per the template milestones.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className={labelCls} htmlFor="q-terms">
                      Payment Terms
                    </label>
                    <select
                      id="q-terms"
                      className={inputCls}
                      value={draft.paymentTerms}
                      onChange={(e) => set("paymentTerms", e.target.value)}
                    >
                      {PAYMENT_TERMS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="q-date">
                      Date
                    </label>
                    <input
                      id="q-date"
                      type="date"
                      className={inputCls}
                      value={draft.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="q-valid">
                      Valid Until
                    </label>
                    <input
                      id="q-valid"
                      type="date"
                      className={inputCls}
                      value={draft.validUntil}
                      onChange={(e) => set("validUntil", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="q-status">
                    Status
                  </label>
                  <select
                    id="q-status"
                    className={inputCls}
                    value={draft.status}
                    onChange={(e) => set("status", e.target.value as Quotation["status"])}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="q-notes">
                    Notes
                  </label>
                  <textarea
                    id="q-notes"
                    rows={2}
                    className={`${inputCls} resize-none`}
                    value={draft.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="e.g. Domain, SSL, and Server charges additional."
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onSave}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                    style={{ background: "var(--grad-primary)" }}
                  >
                    <Save className="h-4 w-4" /> Save Quotation
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Printer className="h-4 w-4" /> Print / PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============ Live preview ============ */}
          <div className="xl:col-span-7">
            <div className="xl:sticky xl:top-0">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Live Preview — {TEMPLATES.find((t) => t.id === draft.templateId)?.label}</span>
                <span>Prints as A4 PDF</span>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <QuotationDocument q={draft} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ Saved quotations ============ */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-slate-900">Saved Quotations</h2>
          <p className="text-sm text-slate-500">{visibleList.length} record(s) — stored in this browser.</p>
        </div>
        {visibleList.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-500">
            No quotations yet. Click <strong>New Quotation</strong> to build one from a template.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 font-semibold">Quotation</th>
                  <th className="px-3 py-3 font-semibold">Client</th>
                  <th className="px-3 py-3 font-semibold">Template</th>
                  <th className="px-3 py-3 text-right font-semibold">Total</th>
                  <th className="px-3 py-3 font-semibold">Date</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleList.map((q) => (
                  <tr key={q.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-semibold text-slate-900">{q.number || "—"}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-900">{q.clientName}</div>
                      {q.contactPerson && <div className="text-xs text-slate-400">{q.contactPerson}</div>}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {TEMPLATES.find((t) => t.id === q.templateId)?.short ?? "Quotation"}
                    </td>
                    <td className="px-3 py-3 text-right font-medium">
                      {formatINR(
                        q.templateId === "mbws-standard"
                          ? mbwsPricing({ ...q, discount: q.discount ?? 0 }).total
                          : quotationTotal(q),
                      )}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{formatDateLong(q.date)}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[q.status]}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          title="View"
                          onClick={() => openForEdit(q)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openForEdit(q)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Print / PDF"
                          onClick={() => printQuotation(q)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => onDelete(q)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print-only copy, portalled to <body> so the admin shell never clips it. */}
      {draft &&
        createPortal(
          <div id="quotation-print-area" className="hidden print:block">
            <QuotationDocument q={draft} />
          </div>,
          document.body,
        )}
    </div>
  );
}
