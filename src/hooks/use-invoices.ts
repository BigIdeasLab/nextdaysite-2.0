"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchInvoices } from "@/lib/api/data-service";
import { useAuth } from "@/context/auth-context";
import type { InvoicesRow } from "@/data/mock-data";

export function useInvoices(options: { enabled?: boolean } = {}) {
  const { client } = useAuth();

  return useQuery<InvoicesRow[]>({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoices(client),
    enabled: options.enabled ?? true,
  });
}
