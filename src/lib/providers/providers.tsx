import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MapContextProvider } from "./map-provider";
import { QueryProvider } from "./query-client";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <MapContextProvider>
          <TooltipProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </TooltipProvider>
        </MapContextProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
