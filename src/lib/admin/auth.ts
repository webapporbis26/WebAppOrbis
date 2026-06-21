import { useEffect, useState } from "react";

const KEY = "weborbis_admin_auth";
const EMAIL = "admin@weborbis.com";
const PASSWORD = "admin123";

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

export function adminLogin(email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== EMAIL || password !== PASSWORD) return false;
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
  notify();
  return true;
}

export function adminLogout() {
  try {
    window.localStorage.removeItem(KEY);
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
