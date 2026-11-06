// Quotations — templates, packages and local storage.
// Data model mirrors the NINAV MoU sample the user shared: a quotation/MoU is
// built from dropdowns (template, client/lead, service package, payment terms)
// and the entered data flows into a print-ready document.

export type QuotationItem = {
  description: string;
  amount: number;
};

export type ScopeGroup = {
  title: string;
  points: string[];
};

export type TemplateId = "mou" | "quotation";

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
};

export const TEMPLATES: { id: TemplateId; label: string; hint: string }[] = [
  {
    id: "mou",
    label: "MoU — Memorandum of Understanding",
    hint: "Full agreement format (NINAV sample): parties, scope, obligations, terms, signatures.",
  },
  {
    id: "quotation",
    label: "Quotation — Standard",
    hint: "Short branded quote: items, totals, payment terms and signature.",
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

function nextNumber(list: Quotation[]): string {
  const year = new Date().getFullYear();
  const seq = list.length + 1;
  return `WO/Q/${year}-${String(seq).padStart(3, "0")}`;
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
  const next = idx >= 0 ? list.map((x) => (x.id === q.id ? q : x)) : [{ ...q, number: q.number || nextNumber(list) }, ...list];
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
  };
}
