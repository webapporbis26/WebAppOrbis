import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Briefcase, RefreshCw, UserCog, FileText, ArrowUpRight, TrendingUp } from "lucide-react";
import { useCollection } from "@/lib/admin/storage";
import { seeds } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const leads = useCollection("wo_admin_leads", seeds.wo_admin_leads as any).items;
  const deals = useCollection("wo_admin_deals", seeds.wo_admin_deals as any).items;
  const renewals = useCollection("wo_admin_renewals", seeds.wo_admin_renewals as any).items;
  const employees = useCollection("wo_admin_employees", seeds.wo_admin_employees as any).items;
  const content = useCollection("wo_admin_content", seeds.wo_admin_content as any).items;

  const cards = [
    { label: "Total Leads", value: leads.length, to: "/admin/leads", icon: Users, accent: "from-indigo-500 to-blue-500" },
    { label: "Active Deals", value: deals.length, to: "/admin/deals", icon: Briefcase, accent: "from-emerald-500 to-teal-500" },
    { label: "Upcoming Renewals", value: renewals.length, to: "/admin/renewals", icon: RefreshCw, accent: "from-amber-500 to-orange-500" },
    { label: "Team Members", value: employees.length, to: "/admin/employees", icon: UserCog, accent: "from-violet-500 to-fuchsia-500" },
    { label: "Content Modules", value: content.length, to: "/admin/content", icon: FileText, accent: "from-sky-500 to-cyan-500" },
  ];

  const recentLeads = leads.slice(0, 5);
  const upcomingRenewals = [...renewals]
    .sort((a: any, b: any) => String(a.expiry).localeCompare(String(b.expiry)))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back 👋</p>
          <h1 className="text-display text-3xl font-semibold sm:text-4xl">Admin Dashboard</h1>
        </div>
        <div className="rounded-full border border-border bg-white px-4 py-2 text-xs text-muted-foreground">
          <TrendingUp className="mr-1.5 inline h-3.5 w-3.5 text-emerald-500" />
          All systems nominal
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant"
          >
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />
            <div className="relative flex items-start justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-soft`}>
                <c.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div className="relative mt-5">
              <div className="text-display text-3xl font-semibold">{c.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Recent Leads" to="/admin/leads">
          <ul className="divide-y divide-border/60">
            {recentLeads.map((l: any) => (
              <li key={l.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{l.company}</div>
                  <div className="text-xs text-muted-foreground">{l.contact} • {l.service}</div>
                </div>
                <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px]">{l.status}</span>
              </li>
            ))}
            {recentLeads.length === 0 && <li className="py-6 text-center text-sm text-muted-foreground">No leads yet.</li>}
          </ul>
        </Panel>

        <Panel title="Upcoming Renewals" to="/admin/renewals">
          <ul className="divide-y divide-border/60">
            {upcomingRenewals.map((r: any) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{r.company}</div>
                  <div className="text-xs text-muted-foreground">{r.domain} • {r.service}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">${Number(r.amount || 0).toLocaleString()}</div>
                  <div className="text-[11px] text-muted-foreground">exp {r.expiry}</div>
                </div>
              </li>
            ))}
            {upcomingRenewals.length === 0 && <li className="py-6 text-center text-sm text-muted-foreground">Nothing upcoming.</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, to, children }: { title: string; to: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-soft">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-display text-lg font-semibold">{title}</h2>
        <Link to={to} className="text-xs font-medium text-primary hover:underline">View all →</Link>
      </div>
      {children}
    </div>
  );
}
