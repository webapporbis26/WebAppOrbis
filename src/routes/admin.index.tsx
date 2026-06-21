import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Briefcase, RefreshCw, UserCog, FileText, ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
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
  const logs = useCollection("wo_admin_logs").items;

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

  const recentLogs = [...logs]
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const urgentRenewals = renewals.filter((r: any) => {
    if (!r.expiry) return false;
    return new Date(r.expiry) <= nextWeek && r.payment !== "Paid" && r.status !== "Renewed";
  }).sort((a: any, b: any) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());

  const leadStatuses = leads.reduce((acc: any, lead: any) => {
    const st = lead.status || 'New';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});
  const leadData = Object.keys(leadStatuses).map(k => ({ name: k, value: leadStatuses[k] }));

  const dealsByStage = deals.reduce((acc: any, deal: any) => {
    const st = deal.stage || 'New Deal';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});
  const dealData = Object.keys(dealsByStage).map(k => ({ name: k, count: dealsByStage[k] }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back 👋</p>
          <h1 className="text-display text-3xl font-semibold sm:text-4xl">Admin Dashboard</h1>
        </div>
      </div>

      {urgentRenewals.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 shadow-soft dark:border-rose-900/50 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
             <AlertCircle className="h-5 w-5" />
             Action Required: Upcoming Expirations
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {urgentRenewals.slice(0, 3).map((r: any) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-2 text-sm shadow-sm dark:bg-card">
                 <div>
                   <span className="font-medium">{r.company}</span> - {r.domain}
                 </div>
                 <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Due: {r.expiry}</span>
                    <Link to="/admin/renewals" className="text-xs underline hover:text-rose-800 dark:hover:text-rose-300">Manage</Link>
                 </div>
              </div>
            ))}
            {urgentRenewals.length > 3 && (
               <Link to="/admin/renewals" className="pl-2 text-xs font-medium text-rose-700 hover:underline dark:text-rose-400">
                 + {urgentRenewals.length - 3} more
               </Link>
            )}
          </div>
        </div>
      )}

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

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Lead Conversion Pipeline" to="/admin/leads">
           <div className="h-64 w-full pt-4">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={leadData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" cx="50%" cy="50%">
                   {leadData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </Panel>
        
        <Panel title="Active Deals by Stage" to="/admin/deals">
           <div className="h-64 w-full pt-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={dealData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                 <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </Panel>
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

        <Panel title="Recent Activity" to="/admin">
           <div className="flex flex-col gap-4">
             {recentLogs.map((log: any) => (
               <div key={log.id} className="flex items-start gap-3">
                 <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                 </div>
                 <div>
                   <div className="text-sm font-medium">{log.action}</div>
                   <div className="text-xs text-muted-foreground">{log.description}</div>
                   <div className="mt-0.5 text-[10px] text-muted-foreground/60">{new Date(log.timestamp).toLocaleString()}</div>
                 </div>
               </div>
             ))}
             {recentLogs.length === 0 && <div className="py-6 text-center text-sm text-muted-foreground">No recent activity.</div>}
           </div>
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
