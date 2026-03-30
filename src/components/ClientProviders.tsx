"use client";

import type { ReactNode } from "react";
import { UserConfigProvider } from "@/context/UserConfigContext";
import rawConfig from "@/config/user.json";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <UserConfigProvider config={rawConfig}>{children}</UserConfigProvider>
  );
}
