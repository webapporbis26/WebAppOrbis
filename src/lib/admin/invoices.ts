// Invoices — MBWS Standard Invoice (Non-GST) data, storage and products.
// Mirrors the quotations lib: records live in browser localStorage (plain
// array, deliberately NOT the TTL useCollection), and the document follows
// the MBWS invoice sample PDF section by section.

import { addDaysISO, todayISO } from "./quotations";

export type InvoiceItem = {
  description: string;
  qty: number;
  rate: number;
  amount: number; // always qty × rate
};

export type InvoiceProduct = {
  id: string;
  name: string;
  rate: number;
};

export type Invoice = {
  id: string;
  number: string; // MBWS/INV/YYYY/NNN
  date: string; // yyyy-mm-dd
  dueDate: string; // yyyy-mm-dd
  paymentTerms: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  projectRef: string;
  poNumber: string;
  items: InvoiceItem[];
  discount: number;
  amountInWords: string;
  accountName: string;
  bank: string;
  accountNo: string;
  ifsc: string;
  upiId: string;
  notes: string;
  status: "Draft" | "Sent" | "Paid";
  createdAt: string;
};

export const INVOICE_PAYMENT_TERMS = ["Due on receipt", "Net 7 days", "Net 15 days", "Net 30 days"];

const STORAGE_KEY = "wo_admin_invoices";
const PRODUCTS_KEY = "wo_admin_invoice_products";

export function invoiceSubtotal(inv: Pick<Invoice, "items">): number {
  return inv.items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
}

export function invoiceTotal(inv: Pick<Invoice, "items" | "discount">): number {
  return Math.max(0, invoiceSubtotal(inv) - (Number(inv.discount) || 0));
}

function readStored<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeStored<T>(key: string, list: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

function nextNumber(list: Invoice[]): string {
  const year = new Date().getFullYear();
  return `MBWS/INV/${year}/${String(list.length + 1).padStart(3, "0")}`;
}

export function loadInvoices(): Invoice[] {
  return readStored<Invoice>(STORAGE_KEY);
}

export function saveInvoice(inv: Invoice): Invoice[] {
  const list = readStored<Invoice>(STORAGE_KEY);
  const idx = list.findIndex((x) => x.id === inv.id);
  const next =
    idx >= 0
      ? list.map((x) => (x.id === inv.id ? inv : x))
      : [{ ...inv, number: inv.number || nextNumber(list) }, ...list];
  writeStored(STORAGE_KEY, next);
  return next;
}

export function deleteInvoice(id: string): Invoice[] {
  const next = readStored<Invoice>(STORAGE_KEY).filter((x) => x.id !== id);
  writeStored(STORAGE_KEY, next);
  return next;
}

// Payment details repeat on every invoice — pre-fill them from the most
// recently saved invoice so they are entered once, not every time.
export function blankInvoice(): Invoice {
  const date = todayISO();
  const latest = readStored<Invoice>(STORAGE_KEY)[0];
  return {
    id: crypto.randomUUID(),
    number: "",
    date,
    dueDate: addDaysISO(date, 15),
    paymentTerms: INVOICE_PAYMENT_TERMS[0],
    clientName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    projectRef: "",
    poNumber: "",
    items: [],
    discount: 0,
    amountInWords: "",
    accountName: latest?.accountName ?? "",
    bank: latest?.bank ?? "",
    accountNo: latest?.accountNo ?? "",
    ifsc: latest?.ifsc ?? "",
    upiId: latest?.upiId ?? "",
    notes: "",
    status: "Draft",
    createdAt: new Date().toISOString(),
  };
}

// ---- Products (the dropdown source for invoice line items) ----

// Names only — rates are entered per business, never invented here.
function seedProducts(): InvoiceProduct[] {
  return [
    "Domain Registration",
    "Server Hosting",
    "SSL Certificate",
    "Business Email Setup",
    "Website Maintenance",
    "Website Development",
  ].map((name) => ({ id: crypto.randomUUID(), name, rate: 0 }));
}

export function loadProducts(): InvoiceProduct[] {
  const stored = readStored<InvoiceProduct>(PRODUCTS_KEY);
  if (stored.length > 0) return stored;
  const seeded = seedProducts();
  writeStored(PRODUCTS_KEY, seeded);
  return seeded;
}

export function saveProducts(list: InvoiceProduct[]): InvoiceProduct[] {
  writeStored(PRODUCTS_KEY, list);
  return list;
}
