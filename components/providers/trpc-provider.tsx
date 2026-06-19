"use client";

import { AppTRPCProvider } from "@/trpc/react";

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  return <AppTRPCProvider>{children}</AppTRPCProvider>;
}
