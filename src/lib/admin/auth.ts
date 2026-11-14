import { useEffect, useState } from "react";

import { authApi } from "./api";

const KEY = "weborbis_admin_auth";
const TOKEN_KEY = "wo_admin_token";

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l();
}

function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// UserType comes from the API JWT (GenerateToken) — e.g. "SuperAdmin" vs "Admin".
export function getAdminUserType(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const payload = decodeJwtPayload(token.replace(/^"|"$/g, "").trim());
    const t = payload?.UserType;
    return typeof t === "string" && t.trim() ? t.trim() : null;
  } catch {
    return null;
  }
}

export function isSuperAdminType(userType: string | null | undefined): boolean {
  if (!userType) return false;
  return userType.toLowerCase().replace(/[\s_-]+/g, "") === "superadmin";
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export async function adminLogin(email: string, password: string): Promise<boolean> {
  try {
    await authApi.login(email, password);
    window.localStorage.setItem(KEY, "1");
    notify();
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
}

export function adminLogout() {
  try {
    authApi.clearToken();
    window.localStorage.removeItem(KEY);
    window.location.href = "/admin";
  } catch {
    /* ignore */
  }
  notify();
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      setAuthed(isAdminAuthed());
      setUserType(getAdminUserType());
    };
    refresh();
    setReady(true);
    const l = () => refresh();
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === TOKEN_KEY) l();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return { authed, ready, userType, isSuperAdmin: isSuperAdminType(userType) };
}
