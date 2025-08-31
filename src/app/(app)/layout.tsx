import { AppDesktopSidebar } from "@/components/sidebar/app-desktop-sidebar";
import { AppMobileSidebar } from "@/components/sidebar/app-movil-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={{ "--sidebar-width": "350px" } as React.CSSProperties}
        >
            {/* Desktop Sidebar Navigation */}
            <div className="hidden md:flex w-full">
                <AppDesktopSidebar />
                <SidebarInset>
                    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4 w-full"
                        />
                    </header>
                    <main className="flex-1">{children}</main>
                </SidebarInset>
            </div>

            {/* Mobile Bottom Navigation */}
            <AppMobileSidebar />
            <div className="flex sm:hidden">

                {children}
            </div>
        </SidebarProvider>
    );
}
