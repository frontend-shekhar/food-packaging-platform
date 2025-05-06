"use client";

import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
  );
  return (
    <>
      <Toaster
        style={{ zIndex: 999 }}
        position="top-right"
        theme="light"
        expand
        richColors
        toastOptions={{
          duration: 1200,
        }}
        closeButton
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

export default Providers;
