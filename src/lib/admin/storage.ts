import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { dealsApi, leadsApi, renewalsApi, contentApi, employeesApi } from "./api";

export type WithId<T> = T & { id: string };

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: WithId<T>[];
  ts: number;
}

function readCache<T>(key: string): WithId<T>[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    // Check TTL — if stale, return null so fresh fetch is triggered
    if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: WithId<T>[]) {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = { data, ts: Date.now() };
    window.localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    /* ignore */
  }
}

function readFallback<T>(key: string, seed: WithId<T>[]): WithId<T>[] {
  // Try new TTL format first
  const cached = readCache<T>(key);
  if (cached) return cached;
  // Try legacy format (plain array)
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    // If it's an array it's the old format — still use it but don't cache-check TTL
    if (Array.isArray(parsed)) return parsed as WithId<T>[];
    return seed;
  } catch {
    return seed;
  }
}

export function useCollection<T extends Record<string, any>>(
  key: string,
  seed: WithId<T>[] = []
) {
  const [items, setItems] = useState<WithId<T>[]>(() => readFallback<T>(key, seed));
  const [loading, setLoading] = useState(false);

  const getApi = () => {
    if (key === 'wo_admin_deals') return dealsApi;
    if (key === 'wo_admin_leads') return leadsApi;
    if (key === 'wo_admin_renewals') return renewalsApi;
    if (key === 'wo_admin_content') return contentApi;
    if (key === 'wo_admin_employees') return employeesApi;
    return null;
  };

  useEffect(() => {
    const api = getApi();
    if (api) {
      const fetchApi = async () => {
        // Only show spinner if cache is empty
        const cached = readCache<T>(key);
        if (!cached) setLoading(true);
        try {
          const data = await api.getAll();
          setItems(data as any);
          writeCache(key, data as any);
        } catch (error) {
          console.error(`Failed to fetch ${key} from API`, error);
          toast.error(`Failed to load data. Showing cached version.`);
        } finally {
          setLoading(false);
        }
      };
      fetchApi();
    } else if (typeof window !== "undefined") {
      writeCache(key, items as any);
    }
  }, [key]);

  const create = useCallback(async (data: T) => {
    const api = getApi();
    if (api) {
      try {
        await api.addOrUpdate(data);
        const newData = await api.getAll();
        setItems(newData as any);
        writeCache(key, newData as any);
        toast.success("Record created successfully!");
      } catch (err: any) {
        console.error("API create failed", err);
        toast.error(`Failed to create record: ${err?.message ?? "Unknown error"}`);
      }
    } else {
      setItems((prev) => [{ ...(data as any), id: crypto.randomUUID() }, ...prev]);
      toast.success("Record created!");
    }
  }, [key]);

  const update = useCallback(async (id: string, data: T) => {
    const api = getApi();
    if (api) {
      try {
        await api.addOrUpdate({ ...data, id });
        const newData = await api.getAll();
        setItems(newData as any);
        writeCache(key, newData as any);
        toast.success("Record updated successfully!");
      } catch (err: any) {
        console.error("API update failed", err);
        toast.error(`Failed to update record: ${err?.message ?? "Unknown error"}`);
      }
    } else {
      setItems((prev) => prev.map((it) => (it.id === id ? { ...(data as any), id } : it)));
      toast.success("Record updated!");
    }
  }, [key]);

  const remove = useCallback(async (id: string) => {
    const api = getApi();
    if (api) {
      try {
        await api.delete(id);
        const newData = await api.getAll();
        setItems(newData as any);
        writeCache(key, newData as any);
        toast.success("Record deleted successfully!");
      } catch (err: any) {
        console.error("API remove failed", err);
        toast.error(`Failed to delete record: ${err?.message ?? "Unknown error"}`);
      }
    } else {
      setItems((prev) => prev.filter((it) => it.id !== id));
      toast.success("Record deleted!");
    }
  }, [key]);

  return { items, create, update, remove, setItems, loading };
}

export function useActivityLogger() {
  const { create } = useCollection<Record<string, any>>("wo_admin_logs");
  const logActivity = useCallback((action: string, description: string) => {
    create({
      action,
      description,
      timestamp: new Date().toISOString()
    });
  }, [create]);

  return logActivity;
}
