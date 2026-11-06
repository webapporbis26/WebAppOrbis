// Print-ready quotation / MoU document. Rendered twice by the Quotations page:
// once as the on-screen preview and once (via portal) as the print-only copy,
// so the printed PDF is exactly what is previewed.
import {
  COMPANY,
  PACKAGES,
  formatDateLong,
  formatINR,
  quotationGst,
  quotationSubtotal,
  quotationTotal,
  type Quotation,
} from "@/lib/admin/quotations";

function DocHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <div
        className="flex items-start justify-between gap-6 rounded-2xl px-6 py-5 text-white"
        style={{ background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)", printColorAdjust: "exact" }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="WebApp Orbis" className="h-11 w-11 rounded-xl bg-white object-contain p-1" />
          <div>
            <div className="font-display text-xl font-bold leading-tight">WebApp Orbis</div>
            <div className="text-[11px] text-white/85">{COMPANY.address}</div>
            <div className="text-[11px] text-white/85">
              {COMPANY.email} · {COMPANY.website}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-lg font-bold uppercase tracking-wide">{title}</div>
          <div className="text-[11px] text-white/85">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-1.5 mt-5 font-display text-[13px] font-bold uppercase tracking-wider text-[#1d4ed8]">
      {children}
    </h3>
  );
}

function MouDocument({ q }: { q: Quotation }) {
  const pkg = PACKAGES.find((p) => p.id === q.packageId) ?? PACKAGES[0];
  const subtotal = quotationSubtotal(q);
  const gst = quotationGst(q);
  const total = quotationTotal(q);

  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <DocHeader title="Memorandum of Understanding" subtitle={`Ref: ${q.number || "—"} · ${formatDateLong(q.date)}`} />

      <p className="mt-5">
        This Memorandum of Understanding (hereinafter referred to as the &ldquo;MoU&rdquo;) is entered into on this day of{" "}
        <strong>{formatDateLong(q.date)}</strong>, by and between:
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Party One</div>
          <div className="mt-1 font-display text-base font-bold text-slate-900">{COMPANY.name}</div>
          <div className="text-slate-600">
            A website and app design and development company based in {COMPANY.address}.
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Party Two</div>
          <div className="mt-1 font-display text-base font-bold text-slate-900">{q.clientName || "—"}</div>
          {q.contactPerson && <div className="text-slate-600">Contact: {q.contactPerson}</div>}
          {q.business && <div className="text-slate-600">{q.business}</div>}
          {q.address && <div className="text-slate-600">{q.address}</div>}
        </div>
      </div>

      <SectionTitle>Background</SectionTitle>
      <p>
        Party One is engaged in the business of website and app design and development, including but not limited to
        UI/UX design, web development, mobile application development, maintenance, and other related services.
      </p>
      <p className="mt-2">
        Party Two is a renowned entity and desires to avail services from Party One for its business.
      </p>

      <SectionTitle>1. Services and Deliverables</SectionTitle>
      <p>
        a. Party One, {COMPANY.name}, agrees to provide the following services to Party Two, in accordance with the
        terms of this MoU:
      </p>
      {pkg.scope.map((g) => (
        <div key={g.title} className="mt-3 break-inside-avoid">
          <div className="font-semibold text-slate-900">{g.title}</div>
          <ul className="ml-5 list-disc text-slate-700">
            {g.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-3">
        b. <strong>Client&rsquo;s Responsibilities:</strong> Party Two shall provide timely access to necessary
        information, data, and assets, collaborate on content ensuring accuracy and relevance, and grant necessary
        access permissions to platforms required for the execution of the services.
      </p>
      <p className="mt-2">
        c. <strong>Modifications to Scope:</strong> Any modifications or additions to the scope may be considered upon
        mutual written agreement between the parties and shall be documented as an addendum to this MoU.
      </p>

      <SectionTitle>2. Duration</SectionTitle>
      <p>
        a. <strong>Commencement Date:</strong> The collaboration under this MoU shall commence on{" "}
        <strong>{formatDateLong(q.date)}</strong>, which shall be considered the effective date of this agreement.
      </p>

      <SectionTitle>3. Termination</SectionTitle>
      <p>
        a. This Agreement will be terminated immediately if either Party breaches the terms of this Agreement without
        rectifying such breach within a reasonable period.
      </p>
      <p className="mt-1">
        b. This Agreement may be terminated at any time by either Party by providing prior written notice to the other
        Party.
      </p>
      <p className="mt-1">c. This Agreement will automatically be terminated when both parties complete their obligations.</p>

      <SectionTitle>4. Obligations of Party One</SectionTitle>
      <p>
        Party One shall develop and deliver the agreed services as per the scope, maintain quality and industry
        standards, provide timely updates and regular progress reports, maintain open communication and transparency,
        and keep all information received from Party Two confidential.
      </p>

      <SectionTitle>5. Obligations of Party Two</SectionTitle>
      <p>
        Party Two shall promptly provide accurate and complete information necessary for delivery of the services,
        actively cooperate with timely feedback and approvals, grant necessary access and permissions, respond promptly
        to queries, and adhere to the payment terms outlined in Section 8. Failure to make timely payments may result
        in suspension of services or termination of this agreement.
      </p>

      <SectionTitle>6. Confidentiality</SectionTitle>
      <p>
        All terms and conditions of this Agreement, as well as any confidential information shared between the parties,
        shall be kept confidential unless disclosure is required by law. This obligation survives termination of this
        Agreement and remains in effect indefinitely.
      </p>

      <SectionTitle>7. Intellectual Property</SectionTitle>
      <p>
        Any intellectual property provided by Party Two shall remain the sole property of Party Two. Party One will
        refrain from using such intellectual property upon termination of this agreement. Upon termination, Party Two
        shall promptly return or, at Party One&rsquo;s option, destroy all materials provided by Party One.
      </p>

      <SectionTitle>8. Financial Arrangements</SectionTitle>
      <p>a. Proposed Expenses:</p>
      <table className="mt-2 w-full border-collapse overflow-hidden rounded-xl text-left">
        <thead>
          <tr className="bg-[#1d4ed8] text-white" style={{ printColorAdjust: "exact" }}>
            <th className="px-4 py-2.5 font-semibold">Work</th>
            <th className="w-36 px-4 py-2.5 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="border-t border-slate-200 px-4 py-2.5">{it.description}</td>
              <td className="border-t border-slate-200 px-4 py-2.5 text-right font-medium">{formatINR(it.amount)}</td>
            </tr>
          ))}
          <tr className="bg-slate-100 font-bold text-slate-900">
            <td className="border-t border-slate-200 px-4 py-2.5">
              Total{q.gstEnabled ? " (excl. GST)" : ""}
            </td>
            <td className="border-t border-slate-200 px-4 py-2.5 text-right">{formatINR(subtotal)}</td>
          </tr>
          {q.gstEnabled && (
            <>
              <tr className="bg-white">
                <td className="border-t border-slate-200 px-4 py-2.5">GST ({q.gstRate}%)</td>
                <td className="border-t border-slate-200 px-4 py-2.5 text-right font-medium">{formatINR(gst)}</td>
              </tr>
              <tr className="bg-slate-100 font-bold text-slate-900">
                <td className="border-t border-slate-200 px-4 py-2.5">Total (incl. GST)</td>
                <td className="border-t border-slate-200 px-4 py-2.5 text-right">{formatINR(total)}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <p className="mt-2 text-slate-600">Additional charges: Domain, SSL, and Server charges.</p>
      <p className="mt-2">
        b. <strong>Payment Terms:</strong> {q.paymentTerms}.
      </p>
      <p className="mt-1">
        c. <strong>Additional Services:</strong> Any services outside the scope of this agreement shall be charged
        separately, with a cost estimate approved in writing by Party Two before such services are rendered.
      </p>
      {q.notes && (
        <p className="mt-1">
          d. <strong>Notes:</strong> {q.notes}
        </p>
      )}

      <SectionTitle>9. Amendments</SectionTitle>
      <p>
        Any amendments made to this Agreement must be in writing and signed by both Party One and Party Two.
      </p>

      <SectionTitle>10. Entire Agreement</SectionTitle>
      <p>
        This Agreement constitutes the entire agreement and understanding between the Parties with respect to the
        subject matter herein and supersedes all prior agreements, understandings, inducements, and conditions —
        whether express or implied, oral or written — relating to the same subject matter.
      </p>

      <p className="mt-5">
        <strong>
          In witness whereof, the duly authorised representatives of Party One and Party Two hereby approve and sign
          this Memorandum of Understanding.
        </strong>
      </p>

      <div className="mt-8 grid grid-cols-2 gap-8 break-inside-avoid">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">For {COMPANY.name}</div>
          <div className="mt-10 border-t border-slate-400 pt-2">
            <div className="font-display font-bold text-slate-900">{COMPANY.signatory}</div>
            <div className="text-slate-600">{COMPANY.signatoryRole}</div>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            For {q.clientName || "—"}
          </div>
          <div className="mt-10 border-t border-slate-400 pt-2">
            <div className="font-display font-bold text-slate-900">{q.contactPerson || "Authorised Signatory"}</div>
            <div className="text-slate-600">{q.clientName || ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotationDocumentView({ q }: { q: Quotation }) {
  const pkg = PACKAGES.find((p) => p.id === q.packageId) ?? PACKAGES[0];
  const subtotal = quotationSubtotal(q);
  const gst = quotationGst(q);
  const total = quotationTotal(q);

  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <DocHeader title="Quotation" subtitle={`Ref: ${q.number || "—"}`} />

      <div className="mt-5 grid grid-cols-3 gap-4 text-[13px]">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</div>
          <div className="mt-0.5 font-medium text-slate-900">{formatDateLong(q.date)}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Valid Until</div>
          <div className="mt-0.5 font-medium text-slate-900">{formatDateLong(q.validUntil)}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Service</div>
          <div className="mt-0.5 font-medium text-slate-900">{pkg.label}</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Billed To</div>
        <div className="mt-1 font-display text-base font-bold text-slate-900">{q.clientName || "—"}</div>
        {q.contactPerson && <div className="text-slate-600">Attn: {q.contactPerson}</div>}
        {q.address && <div className="text-slate-600">{q.address}</div>}
        {(q.email || q.phone) && (
          <div className="text-slate-600">
            {[q.email, q.phone].filter(Boolean).join(" · ")}
          </div>
        )}
        {q.business && <div className="text-slate-600">{q.business}</div>}
      </div>

      <table className="mt-5 w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#1d4ed8] text-white" style={{ printColorAdjust: "exact" }}>
            <th className="rounded-tl-lg px-4 py-2.5 font-semibold">#</th>
            <th className="px-4 py-2.5 font-semibold">Description</th>
            <th className="w-36 rounded-tr-lg px-4 py-2.5 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="border-t border-slate-200 px-4 py-2.5 text-slate-500">{i + 1}</td>
              <td className="border-t border-slate-200 px-4 py-2.5">{it.description}</td>
              <td className="border-t border-slate-200 px-4 py-2.5 text-right font-medium">{formatINR(it.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-4 w-72 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium">{formatINR(subtotal)}</span>
        </div>
        {q.gstEnabled && (
          <div className="flex justify-between">
            <span className="text-slate-600">GST ({q.gstRate}%)</span>
            <span className="font-medium">{formatINR(gst)}</span>
          </div>
        )}
        <div
          className="flex justify-between rounded-lg px-3 py-2 text-base font-bold text-white"
          style={{ background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)", printColorAdjust: "exact" }}
        >
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Payment Terms</div>
        <p className="mt-1">{q.paymentTerms}.</p>
        <p className="mt-1 text-slate-600">Additional charges: Domain, SSL, and Server charges.</p>
        {q.notes && <p className="mt-1 text-slate-600">Notes: {q.notes}</p>}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8 break-inside-avoid">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Thank you for your business</div>
          <p className="mt-1 text-slate-600">
            We look forward to working with you. For any queries, reach us at {COMPANY.email}.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">For {COMPANY.name}</div>
          <div className="mt-10 border-t border-slate-400 pt-2">
            <div className="font-display font-bold text-slate-900">{COMPANY.signatory}</div>
            <div className="text-slate-600">{COMPANY.signatoryRole}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuotationDocument({ q }: { q: Quotation }) {
  return q.templateId === "mou" ? <MouDocument q={q} /> : <QuotationDocumentView q={q} />;
}
