import { useEffect, useState } from "react";

import { authApi } from "./api";

const KEY = "weborbis_admin_auth";

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l();
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
  useEffect(() => {
    setAuthed(isAdminAuthed());
    setReady(true);
    const l = () => setAuthed(isAdminAuthed());
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) l();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return { authed, ready };
}
