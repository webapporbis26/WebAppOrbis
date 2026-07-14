export type FieldType = "text" | "email" | "number" | "date" | "select" | "textarea" | "lead_select" | "multiselect";

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
    { name: "address", label: "Address", type: "textarea", full: true },
    { name: "quotationDocumentUrl", label: "Quotation Document URL", type: "text", full: true },
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
    { name: "address", label: "Address", type: "textarea", full: true },
    { name: "quotationDocumentUrl", label: "Quotation Document URL", type: "text", full: true },
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
      type: "multiselect",
      options: ["Domain", "Server", "SSL", "Maintenance", "Others"],
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
  wo_admin_leads: [],
  wo_admin_deals: [],
  wo_admin_renewals: [],
  wo_admin_employees: [],
  wo_admin_content: [],
  wo_admin_logs: [],
};

