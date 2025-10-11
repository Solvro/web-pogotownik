import { Layers } from "lucide-react";

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
import { LAYER_ICONS } from "@/config/icons";
import { typedEntries } from "@/lib/helpers/typescript";

import { LayerToggle } from "./toggle";

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
