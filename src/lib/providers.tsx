import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/lib/query-client";

import { MapContextProvider } from "./map-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MapContextProvider>
        <TooltipProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </MapContextProvider>
    </QueryProvider>
  );
}
