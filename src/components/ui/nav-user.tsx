"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // 👈 hook de next-auth
import { LogOut, Settings, BookOpen, Users, HelpCircle } from "lucide-react";
import { IconUserCircle } from "@tabler/icons-react";

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
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { handleSignOut } from "@/lib/auth-actions";
import { ModeToggle } from "./mode-toggle";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { requireAuth, showDialog, handleLoginRedirect, closeDialog } = useAuthGuard();

  const { data: session, status } = useSession(); // 👈 sesión del usuario
  const user = session?.user || {
    name: "Invitado",
    email: "",
    image: "",
  };

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
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="rounded-lg">
                      {user.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleProfileClick}>
                  <IconUserCircle />
                  Mi perfil
                </DropdownMenuItem>

              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <div className="px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tema</span>
                    <ModeToggle />
                  </div>
                </div>

              </DropdownMenuGroup>

              {status === "authenticated" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut />
                    Cerrar sesión
                  </DropdownMenuItem>
                </>
              )}
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
