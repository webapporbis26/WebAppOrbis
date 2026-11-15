import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Printer, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { InvoiceDocument } from "@/components/admin/InvoiceDocument";
import { useAdminAuth } from "@/lib/admin/auth";
import { useCollection } from "@/lib/admin/storage";
import { formatDateLong, formatINR } from "@/lib/admin/quotations";
import {
  INVOICE_PAYMENT_TERMS,
  blankInvoice,
  deleteInvoice,
  invoiceSubtotal,
  invoiceTotal,
  loadInvoices,
  loadProducts,
  saveInvoice,
  saveProducts,
  type Invoice,
  type InvoiceItem,
  type InvoiceProduct,
} from "@/lib/admin/invoices";

export const Route = createFileRoute("/admin/invoices")({
  component: InvoicesRoute,
});

// Invoices are super-admin only (API JWT UserType), like Renewals.
function InvoicesRoute() {
  const { ready, isSuperAdmin } = useAdminAuth();
  if (!ready) return null;
  if (!isSuperAdmin) return <Navigate to="/admin" replace />;
  return <InvoicesPage />;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";
const labelCls = "mb-1.5 block text-sm font-semibold text-slate-700";

const statusTone: Record<Invoice["status"], string> = {
  Draft: "bg-slate-100 text-slate-600",
  Sent: "bg-blue-50 text-blue-700",
  Paid: "bg-emerald-50 text-emerald-700",
};

function InvoicesPage() {
  const [list, setList] = useState<Invoice[]>(() => loadInvoices());
  const [draft, setDraft] = useState<Invoice | null>(null);
  const [clientSource, setClientSource] = useState<string>("");
  const [products, setProducts] = useState<InvoiceProduct[]>(() => loadProducts());
  const { items: leads } = useCollection<Record<string, any>>("wo_admin_leads");
  const printQueued = useRef(false);

  // Print only after the portal has rendered the requested document.
  useEffect(() => {
    if (printQueued.current && draft) {
      printQueued.current = false;
      const t = window.setTimeout(() => window.print(), 150);
      return () => window.clearTimeout(t);
    }
  }, [draft]);

  const set = <K extends keyof Invoice>(key: K, value: Invoice[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const startNew = () => {
    setDraft(blankInvoice());
    setClientSource("");
    window.scrollTo({ top: 0 });
  };

  const cloneInvoice = (inv: Invoice): Invoice => ({
    ...inv,
    items: inv.items.map((i) => ({ ...i })),
  });

  const openForEdit = (inv: Invoice) => {
    setDraft(cloneInvoice(inv));
    setClientSource("");
    window.scrollTo({ top: 0 });
  };

  const printInvoice = (inv: Invoice) => {
    printQueued.current = true;
    setDraft(cloneInvoice(inv));
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
          }
        : d,
    );
  };

  const updateItem = (i: number, patch: Partial<InvoiceItem>) => {
    if (!draft) return;
    set(
      "items",
      draft.items.map((x, xi) => {
        if (xi !== i) return x;
        const next = { ...x, ...patch };
        return { ...next, amount: (next.qty || 0) * (next.rate || 0) };
      }),
    );
  };

  const addItemFromProduct = (productId: string) => {
    if (!draft || !productId) return;
    const p = products.find((x) => x.id === productId);
    if (!p) return;
    set("items", [
      ...draft.items,
      { description: p.name, qty: 1, rate: p.rate, amount: p.rate },
    ]);
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
    const next = saveInvoice(draft);
    setList(next);
    const saved = next.find((x) => x.id === draft.id);
    if (saved) setDraft(saved);
    toast.success(`Invoice ${saved?.number ?? "saved"} saved.`);
  };

  const onDelete = (inv: Invoice) => {
    if (!window.confirm(`Delete invoice ${inv.number || inv.clientName}?`)) return;
    setList(deleteInvoice(inv.id));
    if (draft?.id === inv.id) setDraft(null);
    toast.success("Invoice deleted.");
  };

  const updateProducts = (next: InvoiceProduct[]) => {
    setProducts(next);
    saveProducts(next);
  };

  const subtotal = draft ? invoiceSubtotal(draft) : 0;
  const total = draft ? invoiceTotal(draft) : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Invoices</h1>
          <p className="mt-1 text-sm text-slate-500">
            MBWS invoices (Non-GST) — pick products from the dropdown or type items, then print a neat PDF.
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          style={{ background: "var(--grad-primary)" }}
        >
          <Plus className="h-4 w-4" /> New Invoice
        </button>
      </div>

      {draft && (
        <div className="mb-8 grid gap-6 xl:grid-cols-12">
          {/* ============ Builder form ============ */}
          <div className="space-y-5 xl:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {draft.number ? `Edit ${draft.number}` : "New Invoice"}
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
                  <label className={labelCls} htmlFor="inv-client">
                    Client (from Leads)
                  </label>
                  <select
                    id="inv-client"
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
                    <label className={labelCls} htmlFor="inv-company">
                      Company / Name *
                    </label>
                    <input
                      id="inv-company"
                      className={inputCls}
                      value={draft.clientName}
                      onChange={(e) => set("clientName", e.target.value)}
                      placeholder="Client / Company Name"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-contact">
                      Contact Person
                    </label>
                    <input
                      id="inv-contact"
                      className={inputCls}
                      value={draft.contactPerson}
                      onChange={(e) => set("contactPerson", e.target.value)}
                      placeholder="Contact Person"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-email">
                      Email
                    </label>
                    <input
                      id="inv-email"
                      type="email"
                      className={inputCls}
                      value={draft.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="info@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-phone">
                      Phone
                    </label>
                    <input
                      id="inv-phone"
                      className={inputCls}
                      value={draft.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="inv-address">
                    Billing Address
                  </label>
                  <input
                    id="inv-address"
                    className={inputCls}
                    value={draft.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Billing Address, City, State, PIN"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="inv-date">
                      Invoice Date
                    </label>
                    <input
                      id="inv-date"
                      type="date"
                      className={inputCls}
                      value={draft.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-due">
                      Due Date
                    </label>
                    <input
                      id="inv-due"
                      type="date"
                      className={inputCls}
                      value={draft.dueDate}
                      onChange={(e) => set("dueDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-terms">
                      Payment Terms
                    </label>
                    <select
                      id="inv-terms"
                      className={inputCls}
                      value={draft.paymentTerms}
                      onChange={(e) => set("paymentTerms", e.target.value)}
                    >
                      {INVOICE_PAYMENT_TERMS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-status">
                      Status
                    </label>
                    <select
                      id="inv-status"
                      className={inputCls}
                      value={draft.status}
                      onChange={(e) => set("status", e.target.value as Invoice["status"])}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="inv-ref">
                      Project / Reference
                    </label>
                    <input
                      id="inv-ref"
                      className={inputCls}
                      value={draft.projectRef}
                      onChange={(e) => set("projectRef", e.target.value)}
                      placeholder="Project name or quotation number"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-po">
                      PO / Work Order No.
                    </label>
                    <input
                      id="inv-po"
                      className={inputCls}
                      value={draft.poNumber}
                      onChange={(e) => set("poNumber", e.target.value)}
                      placeholder="If applicable"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-700">Items &amp; Services</span>
                    <div className="flex items-center gap-2">
                      <select
                        className="w-44 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                        value=""
                        onChange={(e) => addItemFromProduct(e.target.value)}
                        aria-label="Add item from products"
                      >
                        <option value="">＋ Add from products…</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {formatINR(p.rate)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          set("items", [...draft.items, { description: "", qty: 1, rate: 0, amount: 0 }])
                        }
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add item
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {draft.items.map((it, i) => (
                      <div key={i} className="grid grid-cols-[1fr_56px_96px_96px_32px] gap-2">
                        <input
                          className={inputCls}
                          value={it.description}
                          onChange={(e) => updateItem(i, { description: e.target.value })}
                          placeholder="Service / item description"
                        />
                        <input
                          className={inputCls}
                          type="number"
                          min={0}
                          value={it.qty || ""}
                          onChange={(e) => updateItem(i, { qty: Number(e.target.value) || 0 })}
                          placeholder="Qty"
                          aria-label="Quantity"
                        />
                        <input
                          className={inputCls}
                          type="number"
                          min={0}
                          value={it.rate || ""}
                          onChange={(e) => updateItem(i, { rate: Number(e.target.value) || 0 })}
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
                    ))}
                  </div>
                  <div className="mt-3 space-y-1 rounded-2xl bg-slate-50 p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium">{formatINR(subtotal)}</span>
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
                    <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold text-slate-900">
                      <span>Grand Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                    <p className="pt-1 text-xs text-slate-400">GST: Not charged.</p>
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="inv-words">
                    Amount in Words
                  </label>
                  <input
                    id="inv-words"
                    className={inputCls}
                    value={draft.amountInWords}
                    onChange={(e) => set("amountInWords", e.target.value)}
                    placeholder="Rupees ______________________________ only"
                  />
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">Payment Details</span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={inputCls}
                      value={draft.accountName}
                      onChange={(e) => set("accountName", e.target.value)}
                      placeholder="Account holder name"
                      aria-label="Account holder name"
                    />
                    <input
                      className={inputCls}
                      value={draft.bank}
                      onChange={(e) => set("bank", e.target.value)}
                      placeholder="Bank name"
                      aria-label="Bank name"
                    />
                    <input
                      className={inputCls}
                      value={draft.accountNo}
                      onChange={(e) => set("accountNo", e.target.value)}
                      placeholder="Account number"
                      aria-label="Account number"
                    />
                    <input
                      className={inputCls}
                      value={draft.ifsc}
                      onChange={(e) => set("ifsc", e.target.value)}
                      placeholder="IFSC"
                      aria-label="IFSC"
                    />
                    <input
                      className={inputCls}
                      value={draft.upiId}
                      onChange={(e) => set("upiId", e.target.value)}
                      placeholder="UPI ID (if applicable)"
                      aria-label="UPI ID"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Entered once — the next invoice reuses these details.
                  </p>
                </div>

                <div>
                  <label className={labelCls} htmlFor="inv-notes">
                    Notes
                  </label>
                  <textarea
                    id="inv-notes"
                    rows={2}
                    className={`${inputCls} resize-none`}
                    value={draft.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Service period, renewal details, project reference…"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onSave}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                    style={{ background: "var(--grad-primary)" }}
                  >
                    <Save className="h-4 w-4" /> Save Invoice
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
                <span>Live Preview — MBWS Invoice (Non-GST)</span>
                <span>Prints as A4 PDF</span>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <InvoiceDocument inv={draft} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ Products (dropdown source) ============ */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-slate-900">Products</h2>
          <p className="text-sm text-slate-500">
            Items for the invoice dropdown — add a product once, pick it in any invoice.
          </p>
        </div>
        <div className="space-y-2 px-5 py-4 sm:px-6">
          {products.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_140px_32px] gap-2">
              <input
                className={inputCls}
                value={p.name}
                onChange={(e) =>
                  updateProducts(products.map((x) => (x.id === p.id ? { ...x, name: e.target.value } : x)))
                }
                placeholder="Product / service name"
                aria-label="Product name"
              />
              <input
                className={inputCls}
                type="number"
                min={0}
                value={p.rate || ""}
                onChange={(e) =>
                  updateProducts(
                    products.map((x) => (x.id === p.id ? { ...x, rate: Number(e.target.value) || 0 } : x)),
                  )
                }
                placeholder="Rate ₹"
                aria-label="Product rate"
              />
              <button
                type="button"
                aria-label="Remove product"
                onClick={() => updateProducts(products.filter((x) => x.id !== p.id))}
                className="grid h-10 w-8 place-items-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => updateProducts([...products, { id: crypto.randomUUID(), name: "", rate: 0 }])}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" /> Add product
          </button>
        </div>
      </div>

      {/* ============ Saved invoices ============ */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-slate-900">Saved Invoices</h2>
          <p className="text-sm text-slate-500">{list.length} record(s) — stored in this browser.</p>
        </div>
        {list.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-500">
            No invoices yet. Click <strong>New Invoice</strong> to build one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 font-semibold">Invoice</th>
                  <th className="px-3 py-3 font-semibold">Client</th>
                  <th className="px-3 py-3 text-right font-semibold">Total</th>
                  <th className="px-3 py-3 font-semibold">Date</th>
                  <th className="px-3 py-3 font-semibold">Due</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-semibold text-slate-900">{inv.number || "—"}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-900">{inv.clientName}</div>
                      {inv.contactPerson && <div className="text-xs text-slate-400">{inv.contactPerson}</div>}
                    </td>
                    <td className="px-3 py-3 text-right font-medium">{formatINR(invoiceTotal(inv))}</td>
                    <td className="px-3 py-3 text-slate-600">{formatDateLong(inv.date)}</td>
                    <td className="px-3 py-3 text-slate-600">{formatDateLong(inv.dueDate)}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          title="View"
                          onClick={() => openForEdit(inv)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openForEdit(inv)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Print / PDF"
                          onClick={() => printInvoice(inv)}
                          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => onDelete(inv)}
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
          <div id="invoice-print-area" className="hidden print:block">
            <InvoiceDocument inv={draft} />
          </div>,
          document.body,
        )}
    </div>
  );
}
