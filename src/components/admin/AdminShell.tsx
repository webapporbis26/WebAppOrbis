import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Briefcase, RefreshCw, UserCog, FileText, Search, Bell, LogOut, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
const logo = { url: "/logo.png" };
import { adminLogout } from "@/lib/admin/auth";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/deals", label: "Deals & Projects", icon: Briefcase },
  { to: "/admin/renewals", label: "Renewals", icon: RefreshCw },
  { to: "/admin/employees", label: "Employees", icon: UserCog },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings2 },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Force light mode always in admin
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex h-full">
        {/* Sidebar — sticky, stays in view while page scrolls */}
        <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border/60 bg-card/70 backdrop-blur-xl lg:flex">
          <div className="flex items-center gap-2.5 px-6 py-5">
            <img src={logo.url} alt="WebApp Orbis" className="h-8 w-8 object-contain" />
            <div className="leading-tight">
              <div className="text-display text-base font-semibold">WebApp <span className="text-primary">Orbis</span></div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Admin Console</div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-2">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "text-primary-foreground shadow-elegant"
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                  style={active ? { background: "var(--grad-primary)" } : undefined}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main — grows with content, browser scroll handles it */}
        <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border/60 bg-card/70 px-5 py-3.5 backdrop-blur-xl sm:px-8">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search anything..."
                className="h-10 w-full rounded-full border border-border bg-card/80 pl-9 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex items-center gap-3">

              <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/80 text-foreground/70 transition hover:text-foreground">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-2 py-1.5">
                <div
                  className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
                  style={{ background: "var(--grad-primary)" }}
                >
                  WO
                </div>
                <div className="pr-2 text-xs leading-tight">
                  <div className="font-medium">Admin</div>
                  <div className="text-muted-foreground">admin@weborbis.com</div>
                </div>
              </div>
              <button
                onClick={adminLogout}
                title="Sign out"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/80 text-foreground/70 transition hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Mobile nav */}
          <div className="flex gap-1 overflow-x-auto border-b border-border/60 bg-card/70 px-4 py-2 lg:hidden">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                    active ? "text-primary-foreground" : "text-foreground/70"
                  }`}
                  style={active ? { background: "var(--grad-primary)" } : undefined}
                >
                  <n.icon className="h-3.5 w-3.5" /> {n.label}
                </Link>
              );
            })}
          </div>

          <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
