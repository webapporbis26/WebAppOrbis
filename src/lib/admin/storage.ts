import { useCallback, useEffect, useState } from "react";
import { dealsApi, leadsApi, renewalsApi, contentApi, employeesApi } from "./api";

export type WithId<T> = T & { id: string };

function read<T>(key: string, seed: WithId<T>[]): WithId<T>[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as WithId<T>[];
  } catch {
    return seed;
  }
}

export function useCollection<T extends Record<string, any>>(
  key: string,
  seed: WithId<T>[] = []
) {
  const [items, setItems] = useState<WithId<T>[]>(() => read<T>(key, seed));
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
        if (items.length === 0) setLoading(true);
        try {
          const data = await api.getAll();
          setItems(data as any);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(data));
          }
        } catch (error) {
          console.error(`Failed to fetch ${key} from API`, error);
        } finally {
          setLoading(false);
        }
      };
      fetchApi();
    } else if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(items));
    }
  }, [key, items.length === 0 ? 0 : 1]); // Avoid infinite loop by not depending strictly on items ref

  const create = useCallback(async (data: T) => {
    const api = getApi();
    if (api) {
      try {
        await api.addOrUpdate(data);
        const newData = await api.getAll();
        setItems(newData as any);
      } catch (err) {
        console.error("API create failed", err);
      }
    } else {
      setItems((prev) => [{ ...(data as any), id: crypto.randomUUID() }, ...prev]);
    }
  }, [key]);

  const update = useCallback(async (id: string, data: T) => {
    const api = getApi();
    if (api) {
      try {
        await api.addOrUpdate({ ...data, id });
        const newData = await api.getAll();
        setItems(newData as any);
      } catch (err) {
        console.error("API update failed", err);
      }
    } else {
      setItems((prev) => prev.map((it) => (it.id === id ? { ...(data as any), id } : it)));
    }
  }, [key]);

  const remove = useCallback(async (id: string) => {
    const api = getApi();
    if (api) {
      try {
        await api.delete(id);
        const newData = await api.getAll();
        setItems(newData as any);
      } catch (err) {
        console.error("API remove failed", err);
      }
    } else {
      setItems((prev) => prev.filter((it) => it.id !== id));
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
