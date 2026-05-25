// hooks/useApi.ts
import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/api-helper";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async <T>(
      endpoint: string,
      method: HttpMethod = "GET",
      body?: any,
    ): Promise<T> => {
      setLoading(true);
      try {
        return await apiRequest<T>(endpoint, { method, body });
      } catch (err) {
        // Errors are handled by the component (e.g., showing a toast)
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { execute, loading };
};
