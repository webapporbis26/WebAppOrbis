// Print-ready quotation / MoU document. Rendered twice by the Quotations page:
// once as the on-screen preview and once (via portal) as the print-only copy,
// so the printed PDF is exactly what is previewed.
//
// The MoU template reproduces the NINAV sample PDF section by section
// (parties, background, sections 1-10, financial table, signatures) — only the
// client, dates and amounts are filled in from the quotation data.
import {
  COMPANY,
  MBWS_COMPANY,
  PACKAGES,
  daysBetween,
  formatDateLong,
  formatDateShort,
  formatINR,
  mbwsPricing,
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

// ---------------------------------------------------------------------------
// MBWS templates — reproduce the MBWS quotation PDFs section by section
// (letterhead, numbered sections, tables, signatures). Only the client,
// dates, scope rows, charges and payment split come from the quotation data.
// ---------------------------------------------------------------------------

export const MBWS_NAVY = "#1f4e79";
const MBWS_TABLE_HEAD_BG = "#d9e2f3";
const MBWS_GRADIENT = "linear-gradient(90deg, #f5c400, #e91e8c, #7b2d8b, #00a9ce)";
const MBWS_FOOTER_GRADIENT = "linear-gradient(90deg, #00a9ce, #5b2c8a, #e91e8c)";

export function MbwsLetterhead() {
  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <div
            className="font-display text-[34px] font-black leading-none tracking-tight"
            style={{
              background: "linear-gradient(135deg, #e91e8c, #5b2c8a)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              printColorAdjust: "exact",
            }}
          >
            MBWS
          </div>
          <div className="mt-0.5 text-[15px] font-semibold leading-none text-[#2e75b6]">Software Solutions</div>
        </div>
        <div className="text-right text-[12px] leading-relaxed text-slate-700">
          <div>{MBWS_COMPANY.phone}</div>
          <div>{MBWS_COMPANY.email}</div>
          <div>{MBWS_COMPANY.website}</div>
        </div>
      </div>
      <div className="mt-2 h-1 w-full" style={{ background: MBWS_GRADIENT, printColorAdjust: "exact" }} />
    </div>
  );
}

export function MbwsFooter() {
  return (
    <div className="mt-8">
      <div className="border-t border-slate-300 pt-2 text-[11px] text-slate-500">
        {MBWS_COMPANY.name} | {MBWS_COMPANY.website} | {MBWS_COMPANY.email} | {MBWS_COMPANY.phone}
      </div>
      <div
        className="mt-2 py-1.5 text-center text-[12px] font-medium text-white"
        style={{ background: MBWS_FOOTER_GRADIENT, printColorAdjust: "exact" }}
      >
        {MBWS_COMPANY.website}
      </div>
    </div>
  );
}

function MbwsSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-1.5 mt-5 text-[13px] font-bold uppercase tracking-wide" style={{ color: MBWS_NAVY }}>
      {children}
    </h3>
  );
}

function MbwsPageTitle({ title, subtitle, center }: { title: string; subtitle: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className="mt-4 font-display text-[19px] font-bold uppercase tracking-wide"
        style={{ color: MBWS_NAVY }}
      >
        {title}
      </h2>
      <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p>
    </div>
  );
}

const mbwsTh = "px-3 py-2 text-left font-bold";
export const mbwsTd = "border-t border-slate-200 px-3 py-2";

export function MbwsTableHead({ cols, align }: { cols: string[]; align?: ("left" | "right")[] }) {
  return (
    <thead>
      <tr style={{ background: MBWS_TABLE_HEAD_BG, color: MBWS_NAVY, printColorAdjust: "exact" }}>
        {cols.map((c, i) => (
          <th key={c} className={mbwsTh} style={align?.[i] === "right" ? { textAlign: "right" } : undefined}>
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function MbwsMetaTable({ q }: { q: Quotation }) {
  const rows: [string, string, string, string][] = [
    ["Quotation No.", q.number || "—", "Date", formatDateShort(q.date)],
    ["Client Name", q.clientName || "—", "Valid Until", formatDateShort(q.validUntil)],
    [
      "Company / Contact",
      [q.clientName, q.contactPerson].filter(Boolean).join(" — ") || "—",
      "Phone / Email",
      [q.phone, q.email].filter(Boolean).join(" | ") || "—",
    ],
    ["Address", q.address || "—", "", ""],
  ];
  return (
    <table className="mt-4 w-full border-collapse text-[12.5px]">
      <tbody>
        {rows.map(([l1, v1, l2, v2], i) => (
          <tr key={i} className="border-t border-slate-200">
            <td className="w-32 px-2 py-1.5 font-bold text-slate-800">{l1}</td>
            <td className="px-2 py-1.5 text-slate-700">{v1}</td>
            {l2 ? (
              <>
                <td className="w-28 px-2 py-1.5 font-bold text-slate-800">{l2}</td>
                <td className="px-2 py-1.5 text-slate-700">{v2}</td>
              </>
            ) : (
              <td colSpan={2} />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MbwsAcceptance({ q, thankYou }: { q: Quotation; thankYou?: string }) {
  return (
    <div className="mt-6 break-inside-avoid">
      {thankYou && <p>{thankYou}</p>}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            For {MBWS_COMPANY.name}
          </div>
          <div className="mt-10 border-t border-slate-400 pt-2 text-[12px] text-slate-600">
            Authorized Signatory
          </div>
          <div className="mt-4 text-[12px] text-slate-600">
            <div>
              Name: <span className="inline-block w-40 border-b border-slate-400">&nbsp;</span>
            </div>
            <div className="mt-1.5">
              Date: <span className="inline-block w-40 border-b border-slate-400">&nbsp;</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Accepted by Client</div>
          <div className="mt-10 border-t border-slate-400 pt-2 text-[12px] text-slate-600">
            Client Signature / Company Seal
          </div>
          <div className="mt-4 text-[12px] text-slate-600">
            <div>
              Name:{" "}
              <span className="inline-block w-40 border-b border-slate-400">
                {q.clientName ? `\u00a0${q.clientName}` : "\u00a0"}
              </span>
            </div>
            <div className="mt-1.5">
              Date: <span className="inline-block w-40 border-b border-slate-400">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MbwsMonthlyPaymentTerms({
  fee,
  advancePercent,
  advanceLabel,
  balanceLabel,
  note,
}: {
  fee: number;
  advancePercent: number;
  advanceLabel: string;
  balanceLabel: string;
  note: string;
}) {
  const pct = Math.min(100, Math.max(0, advancePercent));
  const advance = (fee * pct) / 100;
  return (
    <div>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Payment Stage", "Payment", "Amount"]} align={["left", "left", "right"]} />
        <tbody>
          <tr>
            <td className={mbwsTd}>{advanceLabel}</td>
            <td className={mbwsTd}>{pct}%</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(advance)}</td>
          </tr>
          <tr>
            <td className={mbwsTd}>{balanceLabel}</td>
            <td className={mbwsTd}>{100 - pct}%</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(fee - advance)}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-2 text-slate-600">{note}</p>
    </div>
  );
}

function MbwsStandardDocument({ q }: { q: Quotation }) {
  const pricing = mbwsPricing(q);
  const scopeRows = (q.scopeRows ?? []).filter((r) => r.feature.trim() || r.description.trim());
  const renewalRows = q.renewalRows ?? [];
  const advancePct = Math.min(100, Math.max(0, q.advancePercent ?? 50));
  const advanceAmount = (pricing.total * advancePct) / 100;
  const validityDays = daysBetween(q.date, q.validUntil) ?? 15;

  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <MbwsLetterhead />
      <MbwsPageTitle
        title="Quotation"
        subtitle="Website Development | Application Development | Digital Solutions"
        center
      />

      <div className="mt-3 border-b border-slate-300 pb-2 text-[12.5px]">
        <div className="flex flex-wrap gap-x-6 gap-y-0.5">
          <span>
            <strong>Quotation No.:</strong> {q.number || "—"}
          </span>
          <span>
            <strong>Date:</strong> {formatDateShort(q.date)}
          </span>
          <span>
            <strong>Valid Until:</strong> {formatDateShort(q.validUntil)}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap gap-x-6 gap-y-0.5">
          <span>
            <strong>Project:</strong> {q.projectName || "—"}
          </span>
          <span>
            <strong>Category:</strong> {q.category || "—"}
          </span>
        </div>
      </div>

      <div className="mt-3 text-[12.5px]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Prepared For</div>
        <div className="mt-1 font-semibold text-slate-900">{q.clientName || "—"}</div>
        {q.contactPerson && <div>{q.contactPerson}</div>}
        {q.address && <div>{q.address}</div>}
        {(q.email || q.phone) && <div>{[q.email, q.phone].filter(Boolean).join(" | ")}</div>}
        {q.gstin && <div>GSTIN: {q.gstin}</div>}
      </div>

      <MbwsSectionTitle>01. Project Overview</MbwsSectionTitle>
      <p>
        We are pleased to submit this quotation for {q.projectName || "the proposed project"}. Our objective is to
        deliver a professional, reliable and user-friendly solution aligned with your business requirements.
      </p>
      {q.projectObjectives && (
        <p className="mt-2">
          <strong>Project objectives:</strong> {q.projectObjectives}
        </p>
      )}

      <MbwsSectionTitle>02. Scope of Work</MbwsSectionTitle>
      <p>The proposed project includes the following pages, modules, features and services:</p>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["No.", "Page / Module / Feature", "Description / Deliverable"]} />
        <tbody>
          {scopeRows.length === 0 && (
            <tr>
              <td className={mbwsTd}>1</td>
              <td className={mbwsTd}>—</td>
              <td className={mbwsTd}>—</td>
            </tr>
          )}
          {scopeRows.map((r, i) => (
            <tr key={i}>
              <td className={`${mbwsTd} w-10`}>{i + 1}</td>
              <td className={mbwsTd}>{r.feature || "—"}</td>
              <td className={mbwsTd}>{r.description || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MbwsSectionTitle>03. Technical Deliverables</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-0.5">
        <li>UI/UX design and responsive layout</li>
        <li>Frontend and backend development</li>
        <li>Database and API integration</li>
        <li>Admin dashboard and payment gateway integration, if included</li>
        <li>Basic on-page SEO, testing, deployment and launch support</li>
      </ul>

      <div className="break-before-page">
        <MbwsPageTitle
          title="Commercial Proposal"
          subtitle="Project investment, recurring charges and payment schedule"
          center
        />
      </div>

      <MbwsSectionTitle>04. Pricing Details</MbwsSectionTitle>
      <p>The professional fees for the agreed scope of work are detailed below:</p>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead
          cols={["Description", "Qty.", "Rate (₹)", "Amount (₹)"]}
          align={["left", "right", "right", "right"]}
        />
        <tbody>
          {q.items.map((it, i) => (
            <tr key={i}>
              <td className={mbwsTd}>{it.description || "—"}</td>
              <td className={`${mbwsTd} text-right`}>{it.qty ?? 1}</td>
              <td className={`${mbwsTd} text-right`}>{formatINR(it.rate ?? it.amount)}</td>
              <td className={`${mbwsTd} text-right font-medium`}>{formatINR(it.amount)}</td>
            </tr>
          ))}
          <tr className="font-medium">
            <td className={`${mbwsTd} font-semibold`} colSpan={3}>
              Subtotal
            </td>
            <td className={`${mbwsTd} text-right`}>{formatINR(pricing.subtotal)}</td>
          </tr>
          <tr>
            <td className={mbwsTd} colSpan={3}>
              Discount (if applicable)
            </td>
            <td className={`${mbwsTd} text-right`}>{formatINR(pricing.discount)}</td>
          </tr>
          <tr className="font-bold text-slate-900">
            <td className={mbwsTd} colSpan={3}>
              Taxable Amount
            </td>
            <td className={`${mbwsTd} text-right`}>{formatINR(pricing.taxable)}</td>
          </tr>
          <tr>
            <td className={mbwsTd} colSpan={3}>
              GST ({q.gstEnabled ? `${q.gstRate}%` : "—"})
            </td>
            <td className={`${mbwsTd} text-right`}>{formatINR(pricing.gst)}</td>
          </tr>
          <tr className="bg-slate-100 font-bold text-slate-900" style={{ printColorAdjust: "exact" }}>
            <td className={`${mbwsTd} uppercase`} colSpan={3}>
              Grand Total
            </td>
            <td className={`${mbwsTd} text-right`}>{formatINR(pricing.total)}</td>
          </tr>
        </tbody>
      </table>
      {q.amountInWords && (
        <p className="mt-2">
          <strong>Amount in words:</strong> {q.amountInWords}
        </p>
      )}
      <p className="mt-1 text-slate-600">Tax treatment: {q.taxTreatment || "GST exclusive"}.</p>

      <MbwsSectionTitle>05. Domain, Hosting &amp; Renewal Charges</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service", "First Year", "Annual Renewal"]} />
        <tbody>
          {renewalRows.map((r, i) => (
            <tr key={i}>
              <td className={mbwsTd}>{r.service}</td>
              <td className={mbwsTd}>{r.firstYear || "—"}</td>
              <td className={mbwsTd}>{r.renewal || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1.5 text-[12px] text-slate-500">
        Clearly identify first-year inclusions and separately chargeable services. Renewal rates may change based on
        third-party provider pricing and applicable taxes.
      </p>

      <MbwsSectionTitle>06. Payment Terms</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead
          cols={["Milestone", "Percentage", "Amount (₹)", "Payment condition"]}
          align={["left", "left", "right", "left"]}
        />
        <tbody>
          <tr>
            <td className={mbwsTd}>Advance Payment</td>
            <td className={mbwsTd}>{advancePct}%</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(advanceAmount)}</td>
            <td className={mbwsTd}>Upon quotation acceptance</td>
          </tr>
          <tr>
            <td className={mbwsTd}>Final Payment</td>
            <td className={mbwsTd}>{100 - advancePct}%</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(pricing.total - advanceAmount)}</td>
            <td className={mbwsTd}>Before final handover / launch</td>
          </tr>
        </tbody>
      </table>

      <MbwsSectionTitle>07. Project Timeline</MbwsSectionTitle>
      <p>
        Estimated duration: <strong>{q.timelineDays ? `${q.timelineDays}` : "—"}</strong> working days from receipt of
        advance payment and all required content, credentials and approvals.
      </p>
      <p className="mt-1">
        Key milestones: Planning → Design approval → Development → Testing → Launch.
      </p>

      <div className="break-before-page">
        <MbwsPageTitle
          title="Terms & Acceptance"
          subtitle="Project responsibilities and quotation approval"
          center
        />
      </div>

      <MbwsSectionTitle>08. Client Responsibilities</MbwsSectionTitle>
      <p>
        The client shall provide accurate content, images, logos, product or service details, contact information,
        access credentials and timely feedback or approvals. The client is responsible for ensuring that supplied
        materials are authorized for use.
      </p>

      <MbwsSectionTitle>09. Support &amp; Maintenance</MbwsSectionTitle>
      <p>{q.supportText || "—"}</p>

      <MbwsSectionTitle>10. Terms &amp; Conditions</MbwsSectionTitle>
      <ol className="ml-4 list-decimal space-y-1">
        <li>This quotation covers only the scope and deliverables listed in this document.</li>
        <li>
          Additional features or changes outside the agreed scope will be estimated and charged separately, subject to
          client approval.
        </li>
        <li>
          Third-party charges, including payment gateway fees, premium plugins, SMS, email, stock assets and external
          APIs, are excluded unless specifically included.
        </li>
        <li>Project timelines depend on timely receipt of content, approvals, access credentials and payments.</li>
        <li>
          Ownership, source-code handover, licenses and usage rights shall be as agreed in writing and subject to full
          payment.
        </li>
        <li>
          Domain, hosting, SSL and recurring services are subject to third-party provider terms, renewal dates and
          applicable charges.
        </li>
        <li>Work will commence after written acceptance and receipt of the agreed advance payment.</li>
        <li>This quotation is valid for {validityDays} days from the date of issue.</li>
      </ol>

      <MbwsSectionTitle>11. Acceptance &amp; Authorization</MbwsSectionTitle>
      <MbwsAcceptance
        q={q}
        thankYou="Thank you for considering MBWS Software Solutions. If the scope, pricing and terms are acceptable, please confirm approval by signing below or providing written acceptance."
      />
      <MbwsFooter />
    </div>
  );
}

const DM_SERVICES: [string, string][] = [
  ["Campaign Management", "Regular management and monitoring of Facebook and Instagram campaigns"],
  ["Campaign Setup", "Campaign setup based on target audience, business objectives and locations"],
  ["Audience Targeting", "Audience selection based on location, interests and relevant customer segments"],
  ["Weekly Posts", "Regular weekly social media posts"],
  ["Basic AI Posters", "Basic promotional poster creation using AI-based tools"],
  ["Content Development", "Development of basic promotional content and captions"],
  ["Campaign Monitoring", "Monitoring campaign performance and audience response"],
  ["Lead Improvement Strategies", "Suggestions and strategies to improve potential leads and enquiries"],
  ["Performance Report", "Regular campaign performance reporting"],
  ["Client Consultation", "Campaign ideas and improvements discussed based on business requirements"],
  [
    "Social Media Accounts",
    "Account setup and management, social media posts, reels creation and publishing, promotional campaigns, page management, online promotion and enquiry generation",
  ],
];

function MbwsDigitalMarketingDocument({ q }: { q: Quotation }) {
  const fee = Number(q.monthlyFee) || 0;
  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <MbwsLetterhead />
      <MbwsPageTitle title="Digital Marketing Quotation" subtitle="Facebook & Instagram • Campaign Management" />
      <MbwsMetaTable q={q} />

      <MbwsSectionTitle>1. Campaign Overview</MbwsSectionTitle>
      <p>
        MBWS Software Solutions will manage the client&rsquo;s Facebook and Instagram digital marketing campaigns with
        a focus on improving online visibility, audience engagement and potential customer enquiries. Campaigns will be
        planned based on the client&rsquo;s business, target audience and selected locations, with strategies developed
        through regular discussion with the client.
      </p>

      <MbwsSectionTitle>2. Services Included</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service", "Scope / Details"]} />
        <tbody>
          {DM_SERVICES.map(([service, scope]) => (
            <tr key={service}>
              <td className={`${mbwsTd} w-52 font-medium`}>{service}</td>
              <td className={mbwsTd}>{scope}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MbwsSectionTitle>3. Monthly Charges</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service", "Billing Cycle", "Amount (INR)"]} align={["left", "left", "right"]} />
        <tbody>
          <tr>
            <td className={mbwsTd}>Digital Marketing Campaign Management</td>
            <td className={mbwsTd}>Monthly</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(fee)}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-1.5 text-right font-bold" style={{ color: MBWS_NAVY }}>
        Quotation Total: {formatINR(fee)} per month
      </p>

      <MbwsSectionTitle>4. Client Responsibilities</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-0.5">
        <li>Quality product/service photographs</li>
        <li>Videos or reels, where available</li>
        <li>Product/service information</li>
        <li>Offers and promotional details</li>
        <li>Business information</li>
        <li>Customer testimonials, if available</li>
        <li>Required contact details and WhatsApp number</li>
      </ul>
      <p className="mt-1.5 text-slate-600">
        Client-provided photos and videos should be clear, relevant and suitable for online advertising.
      </p>

      <MbwsSectionTitle>5. Advertising Budget</MbwsSectionTitle>
      <p>
        Paid advertising charges are separate from the monthly management fee. The client will be responsible for the
        advertising budget paid to Facebook/Instagram. The required advertising budget can be decided based on the
        target location, audience size, campaign objective and required reach, in consultation with the client.
      </p>

      <div className="break-before-page">
        <MbwsPageTitle
          title="Digital Marketing – Terms & Acceptance"
          subtitle="Campaign planning, payment terms and client approval"
          center
        />
      </div>

      <MbwsSectionTitle>6. Campaign Strategy</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Factor", "Consideration"]} />
        <tbody>
          {[
            ["Target Audience", "Relevant potential customers"],
            ["Location", "Selected cities, areas or service locations"],
            ["Business Type", "Products/services being promoted"],
            ["Campaign Objective", "Reach, engagement, enquiries or leads"],
            ["Content", "Available photos, videos and promotional materials"],
            ["Market Response", "Performance of previous campaigns"],
            ["Client Feedback", "Business priorities and campaign requirements"],
          ].map(([factor, consideration]) => (
            <tr key={factor}>
              <td className={`${mbwsTd} w-52 font-medium`}>{factor}</td>
              <td className={mbwsTd}>{consideration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1.5 text-slate-600">
        Strategies may be adjusted based on campaign performance and discussions with the client.
      </p>

      <MbwsSectionTitle>7. Monthly Service Summary</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service Category", "Included"]} />
        <tbody>
          {[
            "Facebook & Instagram Campaign Management",
            "Campaign Setup",
            "Audience & Location Targeting",
            "Weekly Posts",
            "Basic Posters",
            "Content Development",
            "Campaign Monitoring",
            "Lead Improvement Strategies",
            "Performance Report",
            "Client Discussions & Strategy Planning",
          ].map((service) => (
            <tr key={service}>
              <td className={mbwsTd}>{service}</td>
              <td className={mbwsTd}>Included</td>
            </tr>
          ))}
          <tr>
            <td className={mbwsTd}>Paid Advertising Budget</td>
            <td className={mbwsTd}>Separate – payable by client</td>
          </tr>
        </tbody>
      </table>

      <MbwsSectionTitle>8. Important Notes</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-1">
        <li>The monthly charge covers the digital marketing campaign management services listed in this quotation.</li>
        <li>Paid advertising/platform charges are not included in the monthly service charge.</li>
        <li>Basic AI-generated promotional posters are included.</li>
        <li>
          Client-provided quality photographs and videos are recommended for better campaign presentation and results.
        </li>
        <li>
          Lead generation and campaign results may vary depending on target audience, location, offer, competition,
          content quality and market response.
        </li>
        <li>A specific number of leads, enquiries or sales cannot be guaranteed.</li>
        <li>Additional creative requirements beyond the basic included work can be discussed and quoted separately.</li>
      </ul>

      <MbwsSectionTitle>9. Payment Terms</MbwsSectionTitle>
      <MbwsMonthlyPaymentTerms
        fee={fee}
        advancePercent={q.advancePercent ?? 50}
        advanceLabel="Advance – before campaign starts"
        balanceLabel="Balance – during monthly service period"
        note="Campaign work will commence after receipt of the agreed advance payment. Paid advertising/platform charges will be borne separately by the client."
      />

      <MbwsSectionTitle>10. Acceptance</MbwsSectionTitle>
      <p>I/We accept the services, charges and terms stated in this quotation.</p>
      <MbwsAcceptance q={q} />
      <MbwsFooter />
    </div>
  );
}

const SEO_SERVICES: [string, string][] = [
  ["Website SEO Review", "Basic review of the existing website and SEO requirements"],
  ["Keyword Planning", "Selection of relevant keywords based on the business and target location"],
  ["SEO Content Development", "Development of basic SEO-friendly website content"],
  ["Website Content Updates", "Updating and improving website content based on SEO requirements"],
  ["On-Page SEO", "Basic optimization of website pages, headings, titles and descriptions"],
  ["Google Search Console", "Creation, setup and management of Google Search Console"],
  ["Search Performance Monitoring", "Monitoring website performance in Google Search"],
  ["SEO Reporting", "Reports based on Google Search Console data"],
  ["Basic SEO Recommendations", "Suggestions for improving website visibility and search performance"],
];

function MbwsSeoDocument({ q }: { q: Quotation }) {
  const fee = Number(q.monthlyFee) || 0;
  return (
    <div className="text-[13px] leading-relaxed text-slate-800">
      <MbwsLetterhead />
      <MbwsPageTitle title="SEO Services Quotation" subtitle="Search Engine Optimization • Monthly Service Proposal" />
      <MbwsMetaTable q={q} />

      <MbwsSectionTitle>1. Service Overview</MbwsSectionTitle>
      <p>
        MBWS Software Solutions will provide SEO services to improve the website&rsquo;s visibility in Google Search
        and help the business reach relevant potential customers. SEO is a gradual process; a minimum period of 4
        months is recommended before evaluating meaningful search performance. Actual results may vary depending on
        the website, competition, keywords, location and industry.
      </p>

      <MbwsSectionTitle>2. Services Included</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service", "Scope / Details"]} />
        <tbody>
          {SEO_SERVICES.map(([service, scope]) => (
            <tr key={service}>
              <td className={`${mbwsTd} w-52 font-medium`}>{service}</td>
              <td className={mbwsTd}>{scope}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MbwsSectionTitle>3. Monthly Charges</MbwsSectionTitle>
      <table className="mt-2 w-full border-collapse text-left">
        <MbwsTableHead cols={["Service", "Billing Cycle", "Amount (INR)"]} align={["left", "left", "right"]} />
        <tbody>
          <tr>
            <td className={mbwsTd}>SEO Services</td>
            <td className={mbwsTd}>Monthly</td>
            <td className={`${mbwsTd} text-right font-medium`}>{formatINR(fee)}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-1.5 text-right font-bold" style={{ color: MBWS_NAVY }}>
        Quotation Total: {formatINR(fee)} per month
      </p>

      <MbwsSectionTitle>4. Website &amp; Access Requirements</MbwsSectionTitle>
      <p>
        A basic, functional and mobile-friendly website is required to carry out SEO activities effectively. If the
        client does not have a suitable website, website development can be discussed and quoted separately. SEO
        service includes content development and website content updates related to the agreed SEO strategy.
      </p>
      <p className="mt-2">
        Google Business Profile access will be required for local SEO-related activities and monitoring. If a profile
        is not available and a new profile needs to be set up, setup will be charged separately.
      </p>

      <MbwsSectionTitle>5. Google Search Console</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-0.5">
        <li>Create and set up the Google Search Console property.</li>
        <li>Connect the website to Google Search Console.</li>
        <li>Monitor search performance and track queries, impressions, clicks and visibility.</li>
        <li>Provide performance reports based on Google Search Console data.</li>
        <li>Use available data to suggest ongoing SEO improvements.</li>
      </ul>

      <div className="break-before-page">
        <MbwsPageTitle
          title="SEO Quotation – Terms & Requirements"
          subtitle="Client responsibilities, delivery expectations and acceptance"
          center
        />
      </div>

      <MbwsSectionTitle>6. Recommended Timeline</MbwsSectionTitle>
      <p>
        Minimum recommended period: 4 months. SEO results are not immediate. Initial improvements and search visibility
        may begin to appear during this period, but timing varies depending on website quality, competition, target
        keywords, location, industry, existing website authority, content quality and Google&rsquo;s indexing. No
        specific Google ranking position, traffic level or number of enquiries can be guaranteed.
      </p>

      <MbwsSectionTitle>7. Client Requirements</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-0.5">
        <li>Website access and required login permissions</li>
        <li>Google Business Profile access, where applicable</li>
        <li>Business and services/products information</li>
        <li>Target service locations</li>
        <li>Existing photographs and business materials, where available</li>
      </ul>

      <MbwsSectionTitle>8. Important Notes</MbwsSectionTitle>
      <ul className="ml-4 list-disc space-y-1">
        <li>Website development, if required, will be quoted separately.</li>
        <li>Google Business Profile setup, if a new profile needs to be created, involves additional charges.</li>
        <li>Google Search Console setup, monitoring and reporting are included in the monthly SEO service.</li>
        <li>Search rankings depend on Google algorithms, competition and other external factors.</li>
        <li>Specific ranking positions, traffic levels or lead numbers cannot be guaranteed.</li>
      </ul>

      <MbwsSectionTitle>9. Payment Terms</MbwsSectionTitle>
      <MbwsMonthlyPaymentTerms
        fee={fee}
        advancePercent={q.advancePercent ?? 50}
        advanceLabel="Advance – before SEO work starts"
        balanceLabel="Balance – during service period"
        note="SEO work will commence after receipt of the agreed advance payment."
      />

      <MbwsSectionTitle>10. Acceptance</MbwsSectionTitle>
      <p>I/We accept the services, charges and terms stated in this quotation.</p>
      <MbwsAcceptance q={q} />
      <MbwsFooter />
    </div>
  );
}

export function QuotationDocument({ q }: { q: Quotation }) {
  if (q.templateId === "mou") return <MouDocument q={q} />;
  if (q.templateId === "mbws-standard") return <MbwsStandardDocument q={q} />;
  if (q.templateId === "mbws-digital-marketing") return <MbwsDigitalMarketingDocument q={q} />;
  if (q.templateId === "mbws-seo") return <MbwsSeoDocument q={q} />;
  return <QuotationDocumentView q={q} />;
}
