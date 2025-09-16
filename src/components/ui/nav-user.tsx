"use client";

import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AuthAlertDialog } from "@/components/ui/custom/auth-alert-dialog";
import { IconUserCircle } from "@tabler/icons-react";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { requireAuth, showDialog, handleLoginRedirect, closeDialog } = useAuthGuard();

  const handleProfileClick = () => {
    requireAuth(() => {
      router.push("/profile");
    }, "Necesitas estar logueado para ver tu perfil.");
  };

  return (
    <>
      <SidebarMenu className="w-auto">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">JF</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> 
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Login
              </DropdownMenuItem>
            </DropdownMenuGroup>*/}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleProfileClick}>
                  <IconUserCircle />
                  Mi perfil
                </DropdownMenuItem>
                {/*<DropdownMenuItem>
                <CreditCard />
                Facturación
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificaciones
              </DropdownMenuItem>*/}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AuthAlertDialog
        open={showDialog}
        onOpenChange={closeDialog}
        onLogin={handleLoginRedirect}
        description="Necesitas estar logueado para ver tu perfil."
      />
    </>
  );
}
