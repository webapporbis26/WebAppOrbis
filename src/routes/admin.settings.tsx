import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/admin/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getStrength(newPassword);
  const mismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
  const canSubmit = newPassword.length >= 4 && newPassword === confirmPassword && !loading;

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const token = await authApi.getToken();
      const res = await fetch(
        `https://api.webapporbis.com/User/ChangePassword?Password=${encodeURIComponent(newPassword)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      toast.success("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-display text-3xl font-semibold sm:text-4xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your admin account preferences.</p>
      </div>

      {/* Change Password Card */}
      <div className="rounded-2xl border border-border/60 bg-white shadow-soft overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4 bg-muted/20">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <KeyRound className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Change Password</div>
            <div className="text-xs text-muted-foreground">Update your admin account password</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleChange} className="space-y-5 px-6 py-6">
          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new-password" className="text-xs font-medium">
              New Password <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pl-9 pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password strength bar */}
            {newPassword.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= strength.score
                          ? strength.score === 1 ? "bg-rose-400"
                          : strength.score === 2 ? "bg-amber-400"
                          : strength.score === 3 ? "bg-sky-400"
                          : "bg-emerald-400"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-[11px] font-medium ${
                  strength.score === 1 ? "text-rose-500"
                  : strength.score === 2 ? "text-amber-500"
                  : strength.score === 3 ? "text-sky-500"
                  : "text-emerald-600"
                }`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password" className="text-xs font-medium">
              Confirm Password <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className={`pl-9 pr-10 transition-colors ${mismatch ? "border-rose-400" : confirmPassword && !mismatch ? "border-emerald-400" : ""}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mismatch && (
              <p className="text-xs text-rose-500 font-medium">Passwords do not match</p>
            )}
            {!mismatch && confirmPassword.length > 0 && (
              <p className="text-xs text-emerald-600 font-medium">Passwords match ✓</p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={!canSubmit}
              size="sm"
              className="px-6 text-primary-foreground"
              style={{ background: canSubmit ? "var(--grad-primary)" : undefined }}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getStrength(password: string): { score: number; label: string } {
  if (password.length === 0) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  score = Math.max(1, score);
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}
