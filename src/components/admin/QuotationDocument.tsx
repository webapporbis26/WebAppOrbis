// Print-ready quotation / MoU document. Rendered twice by the Quotations page:
// once as the on-screen preview and once (via portal) as the print-only copy,
// so the printed PDF is exactly what is previewed.
//
// The MoU template reproduces the NINAV sample PDF section by section
// (parties, background, sections 1-10, financial table, signatures) — only the
// client, dates and amounts are filled in from the quotation data.
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

      <p className="mt-5 text-center font-display text-lg font-bold tracking-wide text-slate-900">
        MEMORANDUM OF UNDERSTANDING
      </p>
      <p className="mt-3">
        This Memorandum of Understanding (hereinafter referred to as the &ldquo;MoU&rdquo;) is entered into on this day
        of <strong>{formatDateLong(q.date)}</strong>, by and between:
      </p>

      <div className="mt-4">
        <div className="font-semibold text-slate-900">Party One:</div>
        <p className="mt-1">
          <strong>{COMPANY.name}</strong> — A website and app design and development company based in{" "}
          {COMPANY.address}.
        </p>
      </div>
      <div className="mt-3">
        <div className="font-semibold text-slate-900">Party Two:</div>
        <p className="mt-1">
          <strong>{q.clientName || "—"}</strong>
          {q.contactPerson ? ` — ${q.contactPerson}` : ""}
          {q.business ? ` (${q.business})` : ""}
          {q.address ? `, ${q.address}` : ""}
        </p>
      </div>

      <SectionTitle>Background:</SectionTitle>
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
      <p className="mt-2 font-semibold text-slate-900">i. Non-Recurring Bills Work</p>
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
        b. <strong>Client&rsquo;s Responsibilities:</strong> Party Two acknowledges and agrees to undertake the
        following responsibilities to facilitate the provision of digital marketing services:
      </p>
      <p className="mt-1">
        i. Provide timely access to necessary information, data, and assets required for the execution of digital
        marketing strategies.
      </p>
      <p className="mt-1">
        ii. Collaborate with Party One in the development of content, ensuring accuracy and relevance to Party
        Two&rsquo;s business.
      </p>
      <p className="mt-1">
        iii. Grant necessary access permissions to social media accounts, websites, and other relevant platforms as
        required for the implementation of digital marketing strategies.
      </p>
      <p className="mt-3">
        c. <strong>Modifications to Scope:</strong> Any modifications or additions to the scope of collaboration may
        be considered upon mutual written agreement between the parties. Such modifications shall be documented and
        appended to this MoU as an addendum.
      </p>

      <SectionTitle>2. Duration</SectionTitle>
      <p>
        a. <strong>Commencement Date:</strong> The collaboration under this Memorandum of Understanding (MoU) shall
        commence on <strong>{formatDateLong(q.date)}</strong>, which shall be considered the{" "}
        <strong>effective date</strong> of this agreement.
      </p>

      <SectionTitle>3. Termination:</SectionTitle>
      <p>This Agreement may be terminated if the following occurs:</p>
      <p className="mt-1">
        <strong>a.</strong> This Agreement will be terminated immediately if either Party One or Party Two breaches
        the terms of this Agreement. More specifically, it will also be terminated if either Party One or Party Two
        breaches any condition set forth herein without rectifying such breach within a reasonable period.
      </p>
      <p className="mt-1">
        <strong>b.</strong> This Agreement may be terminated at any time by either Party by providing prior written
        notice to the other Party.
      </p>
      <p className="mt-1">
        <strong>c.</strong> This Agreement will automatically be terminated when both parties complete their
        obligations.
      </p>

      <SectionTitle>4. Obligations of Party One:</SectionTitle>
      <p>
        Party One hereby agrees to fulfill the following obligations to ensure the effective delivery of digital
        marketing services.
      </p>
      <p className="mt-2 font-semibold text-slate-900">a. Development and Implementation of Strategies:</p>
      <p className="mt-1">
        i. Develop effective digital marketing strategies based on the information provided by Party Two (e.g.,
        business details, target audience).
      </p>
      <p className="mt-1">
        ii. Collaborate with Party Two in implementing the agreed-upon strategies. This may include joint brainstorming
        sessions, content creation workshops, and ongoing communication.
      </p>
      <p className="mt-2 font-semibold text-slate-900">b. Content Creation and Management:</p>
      <p className="mt-1">
        i. Create high-quality content aligned with the approved strategies and target audience.
      </p>
      <p className="mt-1">
        ii. Manage the scheduling and publication of content across various digital platforms.
      </p>
      <p className="mt-2 font-semibold text-slate-900">c. Campaign Management and Optimization:</p>
      <p className="mt-1">
        i. Actively manage the digital marketing campaign, including monitoring performance metrics and making necessary
        adjustments to optimize results.
      </p>
      <p className="mt-1">
        ii. Provide regular reports to Party Two to keep them informed about the campaign&rsquo;s progress and
        effectiveness.
      </p>
      <p className="mt-2 font-semibold text-slate-900">d. Communication and Transparency:</p>
      <p className="mt-1">
        i. Maintain open communication channels with Party Two, including timely updates, prompt responses to
        inquiries, and addressing any concerns raised.
      </p>
      <p className="mt-1">
        ii. Ensure transparency throughout the process by sharing campaign data and insights with Party Two.
      </p>
      <p className="mt-2 font-semibold text-slate-900">e. Compliance with Client Requirements and Industry Standards:</p>
      <p className="mt-1">
        i. Adhere to all guidelines, brand specifications, and content requirements provided by Party Two.
      </p>
      <p className="mt-1">
        ii. Ensure that all services delivered comply with relevant industry standards and best practices.
      </p>
      <p className="mt-2 font-semibold text-slate-900">f. Meeting Performance Objectives:</p>
      <p className="mt-1">
        i. Work diligently towards achieving the agreed-upon performance objectives outlined in the contract.
      </p>
      <p className="mt-2 font-semibold text-slate-900">g. Confidentiality:</p>
      <p className="mt-1">
        i. Maintain the confidentiality of all information received from Party Two, including business data, customer
        information, and marketing strategies.
      </p>
      <p className="mt-2 font-semibold text-slate-900">h. No Harm to Reputation:</p>
      <p className="mt-1">
        i. Party One agrees to refrain from any actions or practices that could damage the reputation or public image
        of Party Two.
      </p>

      <SectionTitle>5. Obligations of Party Two:</SectionTitle>
      <p className="mt-2 font-semibold text-slate-900">a. Provision of Information:</p>
      <p className="mt-1">
        Party Two shall promptly provide accurate and complete information necessary for the delivery of digital
        marketing services. This includes, but is not limited to, business details, target audience information, and
        any other data relevant to the effective execution of the agreed-upon strategies.
      </p>
      <p className="mt-2 font-semibold text-slate-900">b. Cooperation:</p>
      <p className="mt-1">
        Party Two shall actively cooperate with Party One in the development and implementation of digital marketing
        strategies. This includes providing timely feedback, granting necessary approvals, and collaborating on content
        creation to ensure the success of the campaign.
      </p>
      <p className="mt-2 font-semibold text-slate-900">c. Access and Permissions:</p>
      <p className="mt-1">
        Party Two shall grant Party One the necessary access and permissions to social media accounts, websites, and
        other relevant platforms to facilitate the execution of digital marketing services.
      </p>
      <p className="mt-2 font-semibold text-slate-900">d. Compliance with Guidelines:</p>
      <p className="mt-1">
        Party Two shall comply with all guidelines provided by Party One to ensure the effectiveness of the digital
        marketing campaign. This includes adhering to content standards, posting schedules, and any other instructions
        issued by Party One.
      </p>
      <p className="mt-2 font-semibold text-slate-900">e. No Harm to Reputation:</p>
      <p className="mt-1">
        Party Two shall not engage in any activity that may harm the reputation or interests of Party One. This
        includes refraining from actions that could negatively affect the delivery of digital marketing services or the
        overall brand image of Party One.
      </p>
      <p className="mt-2 font-semibold text-slate-900">f. Prompt Response:</p>
      <p className="mt-1">
        Party Two shall respond promptly to any queries, requests, or communications from Party One related to the
        collaboration. Timely communication is essential for the successful implementation of digital marketing
        strategies.
      </p>
      <p className="mt-2 font-semibold text-slate-900">g. Payment Obligations:</p>
      <p className="mt-1">
        Party Two shall adhere to the payment terms outlined in Section 7 (Financial Arrangements) of this MoU. Failure
        to make timely payments may result in the suspension of services or the termination of this agreement, as
        outlined in Section 3 (Termination).
      </p>

      <SectionTitle>6. Confidentiality:</SectionTitle>
      <p>
        <strong>a.</strong> All terms and conditions of this Agreement, as well as any confidential information shared
        between Party One and Party Two during the term of the Agreement, shall be kept confidential, unless disclosure
        is required by law.
      </p>
      <p className="mt-1">
        <strong>b.</strong> Disclosure or use of this information for any purpose beyond the scope of this Agreement,
        or beyond the exceptions set forth above, is expressly prohibited without the prior written consent of both
        Party One and Party Two.
      </p>
      <p className="mt-1">
        <strong>c.</strong> The obligation of Party One and Party Two to maintain confidentiality will survive the
        termination of this Agreement and remain in effect indefinitely.
      </p>

      <SectionTitle>7. Intellectual Property:</SectionTitle>
      <p>
        a. Party One agrees that any intellectual property provided by Party Two shall remain the sole property of
        Party Two, including (but not limited to) copyrights, patents, trade secret rights, and other intellectual
        property rights associated with any ideas, concepts, techniques, inventions, processes, works of authorship,
        confidential information, or trade secrets.
      </p>
      <p className="mt-1">
        b. Party One will refrain from using such intellectual property upon the termination of this agreement.
      </p>
      <p className="mt-1">
        c. Return of Materials: Upon termination of this collaboration, Party Two shall promptly return or, at Party
        One&rsquo;s option, destroy all materials, documents, or information provided by Party One, including any
        copies thereof.
      </p>

      <SectionTitle>8. Financial Arrangements:</SectionTitle>
      <p>a. Proposed Expenses:</p>
      <p className="mt-1 font-semibold text-slate-900">i. Non-Recurring Bills</p>
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
            <td className="border-t border-slate-200 px-4 py-2.5">TOTAL</td>
            <td className="border-t border-slate-200 px-4 py-2.5 text-right">
              {formatINR(subtotal)}
              {q.gstEnabled ? " + GST" : ""}
            </td>
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
      <p className="mt-2 text-slate-600">Additional charges: ● Domain, SSL, and Server charges.</p>
      <p className="mt-2">
        b. <strong>Payment Terms:</strong> Party Two shall settle payments to Party One as follows:
      </p>
      <p className="mt-1">i. {q.paymentTerms}.</p>
      {q.notes && (
        <p className="mt-1">
          <strong>Notes:</strong> {q.notes}
        </p>
      )}
      <p className="mt-2">
        c. <strong>Additional Services:</strong> Any services requested or utilized by Party Two that fall outside the
        scope of the initial agreement shall be charged separately. Party One shall issue a cost estimate in accordance
        with the prevailing rate card, which must be approved in writing by Party Two before such services are
        rendered.
      </p>
      <p className="mt-1">
        d. <strong>Late Payment:</strong> If Party Two fails to make payment by the agreed date, Party One reserves
        the right to suspend digital marketing services until full settlement of the outstanding amount.
      </p>
      <p className="mt-1">
        e. <strong>Tax-Inclusive Invoices:</strong> All invoices generated by Party One shall be tax-inclusive.
        However, the quoted cost for digital marketing services excludes applicable taxes. Party Two shall be
        responsible for any additional taxes, duties, or charges.
      </p>

      <SectionTitle>9. Amendments</SectionTitle>
      <p>
        i. Party One and Party Two agree that any amendments made to this Agreement must be in writing and signed by
        both Party One and Party Two.
      </p>
      <p className="mt-1">
        ii. As such, any amendments made by the parties will be applied to this agreement.
      </p>

      <SectionTitle>10. Entire Agreement</SectionTitle>
      <p>
        This Agreement constitutes the entire agreement and understanding between the Parties with respect to the
        subject matter herein. It supersedes all prior agreements, understandings, inducements, and conditions —
        whether express or implied, oral or written — relating to the same subject matter. The express terms of this
        Agreement shall prevail over any prior course of performance or trade usage that is inconsistent with its
        provisions.
      </p>

      <p className="mt-5">
        <strong>
          In witness whereof, the duly authorised representatives of Party One and Party Two hereby approve and sign
          this Memorandum of Understanding. This MoU is signed and delivered by the Parties in two identical copies on
          this {formatDateLong(q.date)}.
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
