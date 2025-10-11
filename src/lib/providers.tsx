import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryProvider } from "@/lib/query-client";

import { MapContextProvider } from "./map-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MapContextProvider>
        <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
      </MapContextProvider>
    </QueryProvider>
  );
}
