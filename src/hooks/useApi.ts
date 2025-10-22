import { useState, useEffect } from "react";
import api from "../api/client";
import type { AxiosError } from "axios";

export type ApiError = AxiosError<{ detail?: string }>;

function isAbortError(error: unknown): error is Error & { name: string } {
  return error instanceof Error && "name" in error;
}

export function useApi<T = unknown>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<T>(url, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (isAbortError(err) && err.name === "CanceledError") {
          // Request was canceled - do nothing
          return;
        }
        setError((err as ApiError).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
