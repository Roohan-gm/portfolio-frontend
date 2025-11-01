import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import type { DeveloperInfo } from "../types";

export const useDeveloperInfo = (enabled = true) =>
  useQuery<DeveloperInfo>({
    queryKey: ["developer"],
    queryFn: () => api.get("/developer").then((res) => res.data),
    enabled,
  });
