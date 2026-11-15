// Print-ready MBWS Standard Invoice (Non-GST). Reproduces the MBWS invoice
// sample PDF section by section — letterhead, meta, Bill To, invoice
// details, items table, totals, payment details, notes, signature.
// Only the client, dates, items, charges and payment details come from data.
import { MBWS_COMPANY, formatDateShort, formatINR } from "@/lib/admin/quotations";
import { MBWS_NAVY, MbwsFooter, MbwsLetterhead, MbwsTableHead, mbwsTd } from "./QuotationDocument";
import { invoiceSubtotal, invoiceTotal, type Invoice } from "@/lib/admin/invoices";

const INVOICE_TITLE_COLOR = "#0e6b7a";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-1.5 mt-4 text-[12px] font-bold uppercase tracking-wide" style={{ color: MBWS_NAVY }}>
      {children}
    </h3>
  );
}

export function InvoiceDocument({ inv }: { inv: Invoice }) {
  const subtotal = invoiceSubtotal(inv);
  const total = invoiceTotal(inv);
  const discount = Math.max(0, Number(inv.discount) || 0);
  const paymentLines: [string, string][] = [
    ["Account Name", inv.accountName],
    ["Bank", inv.bank],
    ["Account No.", inv.accountNo],
    ["IFSC", inv.ifsc],
    ["UPI ID", inv.upiId],
  ].filter(([, v]) => v.trim()) as [string, string][];

  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <MbwsLetterhead />

      <div className="text-center">
        <h2
          className="mt-4 font-display text-[20px] font-bold uppercase tracking-wide"
          style={{ color: INVOICE_TITLE_COLOR }}
        >
          Invoice
        </h2>
        <p className="mt-0.5 text-[12px] text-slate-500">{MBWS_COMPANY.name}</p>
      </div>

      <div className="mt-3 border-b border-slate-300 pb-2 text-[12.5px]">
        <div className="flex flex-wrap gap-x-6 gap-y-0.5">
          <span>
            <strong>Invoice No.:</strong> {inv.number || "—"}
          </span>
          <span>
            <strong>Invoice Date:</strong> {formatDateShort(inv.date)}
          </span>
          <span>
            <strong>Due Date:</strong> {formatDateShort(inv.dueDate)}
          </span>
        </div>
        <div className="mt-0.5">
          <strong>Payment Terms:</strong> {inv.paymentTerms || "—"}
        </div>
      </div>

      <SectionTitle>Bill To</SectionTitle>
      <div className="text-[12.5px]">
        <div className="font-semibold text-slate-900">{inv.clientName || "—"}</div>
        {inv.contactPerson && <div>{inv.contactPerson}</div>}
        {inv.address && <div>{inv.address}</div>}
        {(inv.phone || inv.email) && <div>{[inv.phone, inv.email].filter(Boolean).join(" | ")}</div>}
      </div>

      <SectionTitle>Invoice Details</SectionTitle>
      <div className="text-[12.5px]">
        <div>
          <strong>Project / Reference:</strong> {inv.projectRef || "—"}
        </div>
        <div>
          <strong>PO / Work Order No.:</strong> {inv.poNumber || "—"}
        </div>
      </div>

      <SectionTitle>Items &amp; Services</SectionTitle>
      <table className="mt-1 w-full border-collapse text-left">
        <MbwsTableHead
          cols={["No.", "Description of Goods / Services", "Qty.", "Rate (₹)", "Amount (₹)"]}
          align={["left", "left", "right", "right", "right"]}
        />
        <tbody>
          {inv.items.map((it, i) => (
            <tr key={i}>
              <td className={`${mbwsTd} w-10`}>{i + 1}</td>
              <td className={mbwsTd}>{it.description || "—"}</td>
              <td className={`${mbwsTd} text-right`}>{it.qty}</td>
              <td className={`${mbwsTd} text-right`}>{formatINR(it.rate)}</td>
              <td className={`${mbwsTd} text-right font-medium`}>{formatINR(it.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-1 w-72 space-y-1 text-[12.5px]">
        <div className="flex justify-between border-b border-slate-200 py-1">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 py-1">
          <span className="text-slate-600">Discount (if applicable)</span>
          <span className="font-medium">{formatINR(discount)}</span>
        </div>
        <div
          className="flex justify-between bg-slate-100 px-2 py-1.5 font-bold text-slate-900"
          style={{ printColorAdjust: "exact" }}
        >
          <span className="uppercase">Grand Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>

      <p className="mt-3">
        <strong>Amount in Words:</strong>{" "}
        {inv.amountInWords ? inv.amountInWords : "Rupees ______________________________ only."}
      </p>
      <p className="mt-1 text-slate-600">GST: Not charged.</p>

      <SectionTitle>Payment Details</SectionTitle>
      {paymentLines.length === 0 ? (
        <p className="text-slate-500">—</p>
      ) : (
        <div className="text-[12.5px]">
          {paymentLines.map(([label, value]) => (
            <div key={label}>
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>
      )}

      <SectionTitle>Notes</SectionTitle>
      {inv.notes && <p>{inv.notes}</p>}
      <ul className="ml-4 mt-1 list-disc space-y-0.5 text-slate-600">
        <li>Please make payment by the due date mentioned above.</li>
        <li>
          Domain, hosting, SSL and business email services are subject to the stated renewal period and provider
          terms, where applicable.
        </li>
      </ul>

      <div className="mt-10 break-inside-avoid">
        <div className="text-[12px] text-slate-600">For {MBWS_COMPANY.name}</div>
        <div className="mt-8 w-56 border-t border-slate-400 pt-1 text-[11px] text-slate-500">
          Authorized Signatory
        </div>
        <p className="mt-4 font-medium text-slate-900">Thank you for your business.</p>
        <p className="text-[11px] text-slate-400">This is a computer-generated invoice.</p>
      </div>
      <MbwsFooter />
    </div>
  );
}
