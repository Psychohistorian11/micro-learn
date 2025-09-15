import { AppDesktopSidebar } from "@/components/sidebar/app-desktop-sidebar";
import { AppMobileSidebar } from "@/components/sidebar/app-movil-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider
            style={{ "--sidebar-width": "350px" } as React.CSSProperties}
        >
            <SessionProvider>
                <div className="w-full flex flex-col sm:flex-row min-h-dvh">
                    {/* sidebar desktop */}
                    <div className="hidden sm:flex">
                        <AppDesktopSidebar />
                    </div>

                    {/* contenido */}
                    <div className="flex-1 flex flex-col ">
                        <header className="hidden sm:flex p-2 border-b-1">
                            <SidebarTrigger />
                            <Separator orientation="vertical" />
                        </header>
                        <main className="flex-1">{children}</main>
                        {/* sidebar mobile */}
                        <div className="sm:hidden">
                            <AppMobileSidebar />
                        </div>
                    </div>
                </div>
            </SessionProvider>
        </SidebarProvider>
    );
}
