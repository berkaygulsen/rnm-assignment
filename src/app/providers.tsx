"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppStoreProvider } from "@/store/app-store-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AppStoreProvider>{children}</AppStoreProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
