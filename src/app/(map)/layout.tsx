import React from "react";

import { LayersSidebar } from "@/components/layer-sidebar";
import { MapLegend } from "@/components/layer-sidebar/map-legend";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <main>
      <LayersSidebar />
      <MapLegend />
      {children}
    </main>
  );
}
