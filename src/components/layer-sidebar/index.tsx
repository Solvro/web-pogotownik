import {
  Flame,
  Layers,
  SquareActivity,
  Warehouse,
  Waves,
  Wind,
} from "lucide-react";
import type { ElementType } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Layer } from "@/lib/enums";
import { typedEntries } from "@/lib/helpers/typescript";

import { LayerToggle } from "./toggle";

const LAYER_ICONS: Record<Layer, ElementType> = {
  [Layer.Smog]: Wind,
  [Layer.Fires]: Flame,
  [Layer.Floods]: Waves,
  [Layer.Shelters]: Warehouse,
  [Layer.AEDs]: SquareActivity,
};

export function LayersSidebar() {
  return (
    <Sidebar variant="floating" side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex gap-2">
            Warstwy <Layers size={8} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {typedEntries(LAYER_ICONS).map(([layer, Icon]) => (
                <SidebarMenuItem key={layer}>
                  <SidebarMenuButton asChild>
                    <LayerToggle layer={layer} icon={<Icon />} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
