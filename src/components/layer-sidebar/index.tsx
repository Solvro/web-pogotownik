import { Layers } from "lucide-react";
import Link from "next/link";

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
    <Sidebar
      variant="floating"
      side="right"
      className="top-24 right-6 h-fit w-xs"
    >
      <SidebarContent className="bg-transparent shadow-lg">
        <SidebarGroup className="bg-transparent">
          <SidebarGroupLabel className="flex gap-2 text-black">
            Warstwy <Layers size={8} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {typedEntries(LAYER_ICONS).map(
                ([layer, { icon: Icon, description }]) => (
                  <SidebarMenuItem key={layer}>
                    <SidebarMenuButton asChild>
                      <LayerToggle
                        layer={layer}
                        icon={<Icon className="size-4" />}
                        description={description}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
          <div className="text-muted-foreground flex justify-center text-xs">
            <p className="mt-2 text-center text-balance">
              Nasza{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-blue-600"
              >
                Polityka prywatności
              </Link>{" "}
              oraz{" "}
              <Link
                href="/terms-of-service"
                className="font-medium text-blue-600"
              >
                Warunki korzystania z usługi
              </Link>
              .
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
