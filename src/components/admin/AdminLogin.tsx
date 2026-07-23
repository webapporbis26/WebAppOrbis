import { useState, type FormEvent } from "react";
import { Lock, Mail, AlertCircle } from "lucide-react";
const logo = { url: "/logo.png" };
import { adminLogin } from "@/lib/admin/auth";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const ok = await adminLogin(email, password);
      if (!ok) setError("Invalid credentials. Please try again.");
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[oklch(0.985_0.005_250)] px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--grad-primary)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--grad-primary)" }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-border/60 bg-white/80 p-8 shadow-elegant backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <img src={logo.url} alt="WebApp Orbis" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <div className="text-display text-lg font-semibold">
                WebApp <span className="text-primary">Orbis</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Admin Console
              </div>
            </div>
          </div>

          <h1 className="text-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to access the admin dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground/70">Username or Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@webapporbis.com"
                  className="h-11 w-full rounded-xl border border-border bg-white/80 pl-10 pr-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground/70">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-border bg-white/80 pl-10 pr-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium text-primary-foreground shadow-elegant transition disabled:opacity-60"
              style={{ background: "var(--grad-primary)" }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Restricted area · Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
