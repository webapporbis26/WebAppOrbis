// Quotations — templates, packages and local storage.
// Data model mirrors the NINAV MoU sample the user shared: a quotation/MoU is
// built from dropdowns (template, client/lead, service package, payment terms)
// and the entered data flows into a print-ready document.

export type QuotationItem = {
  description: string;
  amount: number;
  qty?: number; // MBWS Standard pricing table (amount = qty × rate)
  rate?: number;
};

export type ScopeGroup = {
  title: string;
  points: string[];
};

// MBWS Standard template — §02 scope-of-work table rows.
export type ScopeRow = {
  feature: string;
  description: string;
};

// MBWS Standard template — §05 domain/hosting/renewal table rows.
export type RenewalRow = {
  service: string;
  firstYear: string;
  renewal: string;
};

export type TemplateId = "mou" | "quotation" | "mbws-standard" | "mbws-digital-marketing" | "mbws-seo";

export const MBWS_TEMPLATE_IDS: TemplateId[] = ["mbws-standard", "mbws-digital-marketing", "mbws-seo"];

export function isMbwsTemplate(id: TemplateId): boolean {
  return MBWS_TEMPLATE_IDS.includes(id);
}

export type Quotation = {
  id: string;
  number: string;
  templateId: TemplateId;
  date: string; // yyyy-mm-dd
  validUntil: string; // yyyy-mm-dd
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  business: string;
  packageId: string;
  items: QuotationItem[];
  gstEnabled: boolean;
  gstRate: number; // percent, e.g. 18
  paymentTerms: string;
  notes: string;
  status: "Draft" | "Sent" | "Confirmed";
  createdAt: string;
  // ---- MBWS-only fields (optional; older stored records don't have them) ----
  projectName?: string;
  category?: string;
  gstin?: string;
  projectObjectives?: string;
  scopeRows?: ScopeRow[];
  discount?: number;
  taxTreatment?: string; // "GST inclusive" | "GST exclusive"
  amountInWords?: string;
  renewalRows?: RenewalRow[];
  advancePercent?: number; // MBWS payment milestones (balance = 100 - advance)
  timelineDays?: number; // MBWS Standard §07
  supportText?: string; // MBWS Standard §09
  monthlyFee?: number; // MBWS Digital Marketing / SEO monthly charge
};

export const TEMPLATES: { id: TemplateId; label: string; short: string; hint: string; superAdminOnly?: boolean }[] = [
  {
    id: "mou",
    label: "MoU — Memorandum of Understanding",
    short: "MoU",
    hint: "Full agreement format (NINAV sample): parties, scope, obligations, terms, signatures.",
  },
  {
    id: "quotation",
    label: "Quotation — Standard",
    short: "Quotation",
    hint: "Short branded quote: items, totals, payment terms and signature.",
  },
  {
    id: "mbws-standard",
    label: "MBWS — Standard Quotation",
    short: "MBWS Standard",
    hint: "MBWS format: overview, scope table, pricing + GST, domain/hosting, milestones, timeline, terms, acceptance.",
    superAdminOnly: true,
  },
  {
    id: "mbws-digital-marketing",
    label: "MBWS — Digital Marketing Quotation",
    short: "MBWS Digital Marketing",
    hint: "MBWS format: Facebook & Instagram campaign management, monthly fee, advance/balance.",
    superAdminOnly: true,
  },
  {
    id: "mbws-seo",
    label: "MBWS — SEO Services Quotation",
    short: "MBWS SEO",
    hint: "MBWS format: monthly SEO service, 4-month recommended timeline, advance/balance.",
    superAdminOnly: true,
  },
];

export const PAYMENT_TERMS = [
  "50% advance, 50% on completion",
  "100% advance",
  "30% advance, 40% on design approval, 30% on completion",
];

export type ServicePackage = {
  id: string;
  label: string;
  items: QuotationItem[];
  scope: ScopeGroup[];
};

// Amounts for the eCommerce package are from the NINAV MoU sample.
// Other packages ship with item names only — amounts are filled in per client.
export const PACKAGES: ServicePackage[] = [
  {
    id: "ecommerce",
    label: "E-Commerce Website",
    items: [
      { description: "Website Design & Development, Shopping Cart & Checkout", amount: 30000 },
      { description: "Payment Gateway Integration", amount: 8000 },
      { description: "Admin Dashboard", amount: 15000 },
    ],
    scope: [
      {
        title: "Development of a fully responsive eCommerce website for selling",
        points: [
          "Coconut Oil",
          "Chilli Powder (3 Varieties)",
          "Coriander Powder",
          "Turmeric Powder",
          "Future Product Expansion Support",
        ],
      },
      {
        title: "Website Design & Development",
        points: [
          "Custom responsive website design",
          "Mobile, tablet, and desktop compatibility",
          "Product catalog management",
          "Product categories and subcategories",
          "Product search functionality",
          "Product image gallery",
          "SEO-friendly URLs",
        ],
      },
      {
        title: "Shopping Cart & Checkout",
        points: [
          "Add to Cart",
          "Update Cart Quantity",
          "Wishlist (Optional)",
          "Guest Checkout",
          "Order Summary",
          "Coupon / Discount Support",
        ],
      },
      {
        title: "Payment Gateway Integration",
        points: [
          "Razorpay / PayU (India)",
          "Stripe (International)",
          "UPI Payments",
          "Credit & Debit Cards",
          "Net Banking (gateway charges payable directly to payment provider)",
        ],
      },
      {
        title: "Admin Dashboard",
        points: [
          "Product Management",
          "Category Management",
          "Order Management",
          "Customer Management",
          "Sales Reports",
          "Payment Tracking",
          "Coupon Management",
          "Banner Management",
          "Website Content Management",
        ],
      },
      {
        title: "Additional Features",
        points: [
          "WhatsApp Integration",
          "Contact Form",
          "Google Maps Integration",
          "Social Media Integration",
          "Basic SEO Setup",
          "SSL Installation Support",
        ],
      },
    ],
  },
  {
    id: "static",
    label: "Static Website",
    items: [
      { description: "Website Design & Development", amount: 0 },
      { description: "Contact Form & Google Maps Integration", amount: 0 },
      { description: "Basic SEO Setup", amount: 0 },
    ],
    scope: [
      {
        title: "Website Design & Development",
        points: [
          "Custom responsive website design",
          "Mobile, tablet, and desktop compatibility",
          "Contact form",
          "Google Maps integration",
          "Basic SEO setup",
          "SSL installation support",
        ],
      },
    ],
  },
  {
    id: "dynamic",
    label: "Dynamic Website",
    items: [
      { description: "Website Design & Development", amount: 0 },
      { description: "Content Management System", amount: 0 },
      { description: "Admin Dashboard", amount: 0 },
    ],
    scope: [
      {
        title: "Website Design & Development",
        points: [
          "Custom responsive website design",
          "Mobile, tablet, and desktop compatibility",
          "Content management system",
          "Admin dashboard",
          "Basic SEO setup",
          "SSL installation support",
        ],
      },
    ],
  },
  {
    id: "mobile-app",
    label: "Mobile App (Android / iOS)",
    items: [
      { description: "Mobile App Design & Development", amount: 0 },
      { description: "Admin Dashboard", amount: 0 },
      { description: "Play Store / App Store Publishing Support", amount: 0 },
    ],
    scope: [
      {
        title: "Mobile App Development",
        points: [
          "Custom UI/UX design",
          "Android & iOS compatibility",
          "Admin dashboard",
          "Push notifications",
          "Play Store / App Store publishing support",
        ],
      },
    ],
  },
  {
    id: "erp",
    label: "ERP / CRM Software",
    items: [
      { description: "ERP / CRM Design & Development", amount: 0 },
      { description: "Admin Dashboard & Reports", amount: 0 },
      { description: "Training & Support", amount: 0 },
    ],
    scope: [
      {
        title: "ERP / CRM Development",
        points: [
          "Custom modules as per business requirements",
          "Admin dashboard & reports",
          "User roles & permissions",
          "Training & support",
        ],
      },
    ],
  },
];

export const COMPANY = {
  name: "WebApp Orbis",
  address: "Mannanam, Kottayam, Kerala – 686561",
  email: "admin@webapporbis.com",
  website: "webapporbis.com",
  signatory: "Jittu Jain",
  signatoryRole: "Managing Director, WebApp Orbis",
};

// MBWS brand, exactly as printed on the MBWS quotation templates.
export const MBWS_COMPANY = {
  name: "MBWS Software Solutions",
  short: "MBWS",
  phone: "+91 99477 62280",
  email: "hr@mbws.in",
  website: "www.mbws.in",
  tagline: "Innovative Software. Digital Growth. Business Solutions.",
  services: "Web Development | Mobile Applications | ERP Solutions | SEO & Digital Marketing",
};

export const MBWS_TAX_TREATMENTS = ["GST exclusive", "GST inclusive"];

// MBWS Standard §05 — service names are fixed by the template; charges are entered per client.
export function defaultRenewalRows(): RenewalRow[] {
  return [
    { service: "Domain Registration", firstYear: "Included", renewal: "" },
    { service: "Server Hosting", firstYear: "Included", renewal: "" },
    { service: "SSL Certificate", firstYear: "Included", renewal: "" },
    { service: "Email / Maintenance", firstYear: "Included", renewal: "" },
  ];
}

export function defaultScopeRows(): ScopeRow[] {
  return [
    { feature: "", description: "" },
    { feature: "", description: "" },
    { feature: "", description: "" },
  ];
}

// Monthly-charge label used for the single synced line item of the
// Digital Marketing / SEO templates (keeps totals + saved-list totals working).
export function mbwsMonthlyItemLabel(templateId: TemplateId): string {
  return templateId === "mbws-digital-marketing"
    ? "Digital Marketing Campaign Management (Monthly)"
    : "SEO Services (Monthly)";
}

// Defaults applied when a draft switches into an MBWS template. Only fills
// fields the draft doesn't already have a value for.
export function mbwsDefaultsFor(templateId: TemplateId, q: Quotation): Partial<Quotation> {
  if (!isMbwsTemplate(templateId)) return {};
  const base: Partial<Quotation> = {
    advancePercent: q.advancePercent ?? 50,
  };
  if (templateId === "mbws-standard") {
    return {
      ...base,
      projectName: q.projectName ?? "",
      category: q.category ?? "",
      gstin: q.gstin ?? "",
      projectObjectives: q.projectObjectives ?? "",
      scopeRows: q.scopeRows ?? defaultScopeRows(),
      discount: q.discount ?? 0,
      taxTreatment: q.taxTreatment ?? MBWS_TAX_TREATMENTS[0],
      amountInWords: q.amountInWords ?? "",
      renewalRows: q.renewalRows ?? defaultRenewalRows(),
      timelineDays: q.timelineDays ?? undefined,
      supportText: q.supportText ?? "",
    };
  }
  return {
    ...base,
    monthlyFee: q.monthlyFee ?? 0,
    gstEnabled: false,
  };
}

const STORAGE_KEY = "wo_admin_quotations";

export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function quotationSubtotal(q: Pick<Quotation, "items">): number {
  return q.items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
}

export function quotationGst(q: Pick<Quotation, "items" | "gstEnabled" | "gstRate">): number {
  if (!q.gstEnabled) return 0;
  return (quotationSubtotal(q) * (Number(q.gstRate) || 0)) / 100;
}

export function quotationTotal(q: Pick<Quotation, "items" | "gstEnabled" | "gstRate">): number {
  return quotationSubtotal(q) + quotationGst(q);
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function formatDateLong(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

// DD/MM/YYYY, as printed on the MBWS templates.
export function formatDateShort(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// Whole days between two yyyy-mm-dd dates (for the MBWS validity clause).
export function daysBetween(fromIso: string, toIso: string): number | null {
  if (!fromIso || !toIso) return null;
  const a = new Date(fromIso + "T00:00:00").getTime();
  const b = new Date(toIso + "T00:00:00").getTime();
  if (isNaN(a) || isNaN(b)) return null;
  return Math.round((b - a) / 86400000);
}

// MBWS Standard §04 pricing: GST applies to the taxable amount (subtotal − discount).
export function mbwsPricing(q: Pick<Quotation, "items" | "gstEnabled" | "gstRate" | "discount">): {
  subtotal: number;
  discount: number;
  taxable: number;
  gst: number;
  total: number;
} {
  const subtotal = quotationSubtotal(q);
  const discount = Math.max(0, Number(q.discount) || 0);
  const taxable = Math.max(0, subtotal - discount);
  const gst = q.gstEnabled ? (taxable * (Number(q.gstRate) || 0)) / 100 : 0;
  return { subtotal, discount, taxable, gst, total: taxable + gst };
}

function readStored(): Quotation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Quotation[]) : [];
  } catch {
    return [];
  }
}

function writeStored(list: Quotation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

function nextNumber(list: Quotation[], templateId?: TemplateId): string {
  const year = new Date().getFullYear();
  const seq = list.length + 1;
  const padded = String(seq).padStart(3, "0");
  if (templateId && isMbwsTemplate(templateId)) return `MBWS/QTN/${year}/${padded}`;
  return `WO/Q/${year}-${padded}`;
}

/** The NINAV MoU from the sample PDF, pre-seeded so the format is ready to print. */
function seedNinav(): Quotation {
  const date = todayISO();
  const ecommerce = PACKAGES.find((p) => p.id === "ecommerce")!;
  return {
    id: crypto.randomUUID(),
    number: nextNumber([]),
    templateId: "mou",
    date,
    validUntil: addDaysISO(date, 15),
    clientName: "NINAV",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    business: "Spices & Food Products",
    packageId: "ecommerce",
    items: ecommerce.items.map((i) => ({ ...i })),
    gstEnabled: true,
    gstRate: 18,
    paymentTerms: PAYMENT_TERMS[0],
    notes: "",
    status: "Draft",
    createdAt: new Date().toISOString(),
  };
}

export function loadQuotations(): Quotation[] {
  const stored = readStored();
  if (stored.length > 0) return stored;
  const seeded = [seedNinav()];
  writeStored(seeded);
  return seeded;
}

export function saveQuotation(q: Quotation): Quotation[] {
  const list = readStored();
  const idx = list.findIndex((x) => x.id === q.id);
  const next = idx >= 0 ? list.map((x) => (x.id === q.id ? q : x)) : [{ ...q, number: q.number || nextNumber(list, q.templateId) }, ...list];
  writeStored(next);
  return next;
}

export function deleteQuotation(id: string): Quotation[] {
  const next = readStored().filter((x) => x.id !== id);
  writeStored(next);
  return next;
}

export function blankQuotation(): Quotation {
  const date = todayISO();
  return {
    id: crypto.randomUUID(),
    number: "",
    templateId: "quotation",
    date,
    validUntil: addDaysISO(date, 15),
    clientName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    business: "",
    packageId: "",
    items: [],
    gstEnabled: true,
    gstRate: 18,
    paymentTerms: PAYMENT_TERMS[0],
    notes: "",
    status: "Draft",
    createdAt: new Date().toISOString(),
    projectName: "",
    category: "",
    gstin: "",
    projectObjectives: "",
    scopeRows: defaultScopeRows(),
    discount: 0,
    taxTreatment: MBWS_TAX_TREATMENTS[0],
    amountInWords: "",
    renewalRows: defaultRenewalRows(),
    advancePercent: 50,
    timelineDays: undefined,
    supportText: "",
    monthlyFee: 0,
  };
}
