"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Command } from "lucide-react";
import { NavUser } from "@/components/ui/nav-user";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { navigationBarData } from "@/lib/data";
import { AuthAlertDialog } from "@/components/ui/custom/auth-alert-dialog";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export function AppDesktopSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { requireAuth, showDialog, handleLoginRedirect, closeDialog } = useAuthGuard();
  const [activeItem, setActiveItem] = React.useState(navigationBarData.navMain[0]);
  const [mails, setMails] = React.useState(navigationBarData.mails);
  const { setOpen } = useSidebar();

  function handleClick(item: (typeof navigationBarData.navMain)[0]) {
    if (item.title === "Create") {
      requireAuth(() => {
        setActiveItem(item);
        router.push(item.url);
      }, "Necesitas estar logueado para crear un recurso.");
    } else {
      router.push(item.url);
      setActiveItem(item);
      const mail = navigationBarData.mails.sort(() => Math.random() - 0.5);
      setMails(mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)));
      setOpen(true);
    }
  }

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        {...props}
      >
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r bli"
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                  <a href="#">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Acme Inc</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {navigationBarData.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => handleClick(item)}
                        isActive={activeItem?.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <NavUser user={navigationBarData.user} />
          </SidebarFooter>
        </Sidebar>

        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">
                {activeItem?.title}
              </div>
              <Label className="flex items-center gap-2 text-sm">
                <span>Unreads</span>
                <Switch className="shadow-none" />
              </Label>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              {/*<SidebarGroupContent>
                {mails.map((mail) => (
                  <a
                    href="#"
                    key={mail.email}0
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span>{mail.name}</span>{" "}
                      <span className="ml-auto text-xs">{mail.date}</span>
                    </div>
                    <span className="font-medium">{mail.subject}</span>
                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                      {mail.teaser}
                    </span>
                  </a>
                ))}
              </SidebarGroupContent>*/}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </Sidebar>

      <AuthAlertDialog
        open={showDialog}
        onOpenChange={closeDialog}
        onLogin={handleLoginRedirect}
        description="Necesitas estar logueado para crear un recurso."
      />
    </>
  );
}
