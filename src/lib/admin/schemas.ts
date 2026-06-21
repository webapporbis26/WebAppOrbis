export type FieldType = "text" | "email" | "number" | "date" | "select" | "textarea" | "lead_select";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  full?: boolean; // span 2 cols
};

export type EntityConfig = {
  key: string;
  title: string;
  subtitle: string;
  storageKey: string;
  fields: FieldDef[];
  columns: { name: string; label: string; badge?: boolean }[];
  searchable: string[];
};

export const leadsConfig: EntityConfig = {
  key: "leads",
  title: "Leads Management",
  subtitle: "Track and convert incoming inquiries into deals.",
  storageKey: "wo_admin_leads",
  fields: [
    { name: "company", label: "Company / Name", type: "text", required: true },
    { name: "business", label: "Business", type: "text" },
    { name: "contact", label: "Contact Person", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text" },
    {
      name: "service",
      label: "Requirement / Service",
      type: "select",
      options: [
        "Static Website Development",
        "Dynamic Website Development",
        "E-Commerce Website",
        "ERP/CRM Development",
        "Android Application",
        "iOS Application",
        "Website Maintenance",
      ],
    },
    {
      name: "source",
      label: "Source",
      type: "select",
      options: [
        "Direct Referral",
        "Google Search",
        "Google Maps",
        "Facebook",
        "Instagram",
        "WhatsApp Business",
        "LinkedIn",
        "Website",
        "Email",
        "Advertisement",
        "Existing Customer",
        "Other"
      ]
    },
    { name: "budget", label: "Budget", type: "number" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["New", "Contacted", "Quotation Sent", "Confirmed", "Closed"],
    },
    { name: "date", label: "Date", type: "date" },
    { name: "notes", label: "Notes", type: "textarea", full: true },
  ],
  columns: [
    { name: "company", label: "Company" },
    { name: "contact", label: "Contact" },
    { name: "email", label: "Email" },
    { name: "service", label: "Service" },
    { name: "status", label: "Status", badge: true },
    { name: "date", label: "Date" },
  ],
  searchable: ["company", "contact", "email"],
};

export const dealsConfig: EntityConfig = {
  key: "deals",
  title: "Deals & Projects",
  subtitle: "Track project execution stages from confirmed deals.",
  storageKey: "wo_admin_deals",
  fields: [
    { name: "project", label: "Project Name", type: "text", required: true },
    { name: "leadId", label: "Lead / Client", type: "lead_select", required: true },
    { name: "total", label: "Total Amount (₹)", type: "number" },
    { name: "advance", label: "Advance Amount (₹)", type: "number" },
    {
      name: "type",
      label: "Project Type",
      type: "select",
      options: ["Static Website", "Dynamic Website", "E-Commerce", "ERP/CRM", "Mobile App", "Maintenance"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["In Progress", "On Hold", "Completed", "Cancelled"],
    },
    {
      name: "stage",
      label: "Execution Stage",
      type: "select",
      options: [
        "New Deal",
        "Requirements Gathering",
        "In Progress",
        "Client Review",
        "Revision",
        "Completed",
        "Invoiced",
        "Closed",
      ],
    },
    { name: "due", label: "Due Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "textarea", full: true },
  ],
  columns: [
    { name: "project", label: "Project" },
    { name: "leadId", label: "Client" },
    { name: "type", label: "Type" },
    { name: "total", label: "Total" },
    { name: "stage", label: "Stage", badge: true },
    { name: "status", label: "Status", badge: true },
    { name: "due", label: "Due" },
  ],
  searchable: ["project", "leadId"],
};

export const renewalsConfig: EntityConfig = {
  key: "renewals",
  title: "Renewals",
  subtitle: "Manage domain, hosting, and service renewals.",
  storageKey: "wo_admin_renewals",
  fields: [
    { name: "company", label: "Company Name", type: "text", required: true },
    { name: "client", label: "Client Name", type: "text" },
    { name: "domain", label: "Domain Name", type: "text" },
    {
      name: "service",
      label: "Service Type",
      type: "select",
      options: ["Domain", "Server", "SSL", "Domain & Server", "Maintenance", "Others"],
    },
    { name: "domainProvider", label: "Domain Provider", type: "text" },
    { name: "serverProvider", label: "Server Provider", type: "text" },
    { name: "plan", label: "Plan Name", type: "text" },
    {
      name: "billing",
      label: "Billing Cycle",
      type: "select",
      options: ["Monthly", "Quarterly", "Semi-Annually", "Yearly", "Bi-Yearly"],
    },
    { name: "amount", label: "Amount (₹)", type: "number" },
    { name: "start", label: "Start Date", type: "date" },
    { name: "expiry", label: "Expiry Date", type: "date" },
    {
      name: "reminder",
      label: "Reminder Stage",
      type: "select",
      options: ["Active", "Expiring Soon", "Expired", "Renewed", "Cancelled"],
    },
    {
      name: "payment",
      label: "Payment Status",
      type: "select",
      options: ["Pending", "Paid", "Overdue"],
    },
    { name: "notes", label: "Notes", type: "textarea", full: true },
  ],
  columns: [
    { name: "company", label: "Company" },
    { name: "domain", label: "Domain" },
    { name: "service", label: "Service" },
    { name: "amount", label: "Amount" },
    { name: "expiry", label: "Expiry" },
    { name: "reminder", label: "Reminder", badge: true },
    { name: "payment", label: "Payment", badge: true },
  ],
  searchable: ["company", "domain", "client"],
};

export const employeesConfig: EntityConfig = {
  key: "employees",
  title: "Employee Management",
  subtitle: "Manage team members and their roles.",
  storageKey: "wo_admin_employees",
  fields: [
    { name: "name", label: "Employee Name", type: "text", required: true },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "mobile", label: "Mobile Number", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "address", label: "Address", type: "textarea", full: true },
    { name: "department", label: "Department", type: "text", required: true },
    { name: "designation", label: "Designation", type: "text", required: true },
    { name: "skills", label: "Skillset", type: "text" },
    { name: "experience", label: "Experience (Years)", type: "number" },
    { name: "qualification", label: "Qualification", type: "text" },
    { name: "doj", label: "Date of Joining", type: "date", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive", "On Leave"],
    },
  ],
  columns: [
    { name: "name", label: "Name" },
    { name: "designation", label: "Designation" },
    { name: "department", label: "Department" },
    { name: "mobile", label: "Mobile" },
    { name: "status", label: "Status", badge: true },
  ],
  searchable: ["name", "email", "designation", "department", "mobile"],
};

export const contentConfig: EntityConfig = {
  key: "content",
  title: "Content Management",
  subtitle: "Edit and publish content across the live website.",
  storageKey: "wo_admin_content",
  fields: [
    { name: "module", label: "Module Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", full: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Published", "Draft"],
    },
    { name: "updated", label: "Last Updated", type: "date" },
  ],
  columns: [
    { name: "module", label: "Module" },
    { name: "description", label: "Description" },
    { name: "status", label: "Status", badge: true },
    { name: "updated", label: "Last Updated" },
  ],
  searchable: ["module", "description"],
};

export const seeds: Record<string, any[]> = {
  wo_admin_leads: [
    { id: "l1", company: "Northwind Co.", contact: "Amelia Park", email: "amelia@northwind.co", phone: "+1 415 555 0199", service: "E-Commerce Website", status: "Quotation Sent", date: "2026-06-02" },
    { id: "l2", company: "Helios Studio", contact: "Marcus Lee", email: "marcus@helios.io", phone: "+44 20 7946 0123", service: "Dynamic Website Development", status: "Contacted", date: "2026-06-08" },
    { id: "l3", company: "Verdant Foods", contact: "Priya Shah", email: "priya@verdant.com", phone: "+91 98765 43210", service: "ERP/CRM Development", status: "New", date: "2026-06-12" },
  ],
  wo_admin_deals: [
    { id: "d1", project: "Northwind Storefront", leadId: "l1", total: 18500, advance: 6000, type: "E-Commerce", status: "In Progress", stage: "Client Review", due: "2026-08-15", remarks: "Phase 2 starts after design sign-off." },
    { id: "d2", project: "Helios Marketing Site", leadId: "l2", total: 7200, advance: 2400, type: "Dynamic Website", status: "In Progress", stage: "In Progress", due: "2026-07-22", remarks: "" },
  ],
  wo_admin_renewals: [
    { id: "r1", company: "Northwind Co.", client: "Amelia Park", domain: "northwind.co", service: "Domain & Server", domainProvider: "Namecheap", serverProvider: "Hetzner", plan: "Pro Cloud", billing: "Yearly", amount: 240, start: "2025-07-01", expiry: "2026-07-01", reminder: "Expiring Soon", payment: "Pending", notes: "Auto-renew disabled." },
    { id: "r2", company: "Helios Studio", client: "Marcus Lee", domain: "helios.io", service: "SSL", domainProvider: "Cloudflare", serverProvider: "—", plan: "Advanced SSL", billing: "Yearly", amount: 89, start: "2025-09-10", expiry: "2026-09-10", reminder: "Active", payment: "Paid", notes: "" },
  ],
  wo_admin_employees: [
    { id: "e1", name: "Sara Ahmed", email: "sara@weborbis.com", role: "Lead Designer", department: "Design", status: "Active" },
    { id: "e2", name: "Daniel Cruz", email: "daniel@weborbis.com", role: "Senior Engineer", department: "Engineering", status: "Active" },
    { id: "e3", name: "Maya Patel", email: "maya@weborbis.com", role: "Project Manager", department: "Management", status: "On Leave" },
  ],
  wo_admin_content: [
    { id: "c1", module: "Homepage Hero", description: "Main hero headline, CTA and background.", status: "Published", updated: "2026-06-10" },
    { id: "c2", module: "Testimonials", description: "Client testimonial carousel.", status: "Published", updated: "2026-06-05" },
    { id: "c3", module: "Portfolio", description: "Recent works grid.", status: "Draft", updated: "2026-06-12" },
  ],
};
