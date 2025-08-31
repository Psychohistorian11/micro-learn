"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { data } from "@/lib/sidebar-data"
import { NavUser } from "../ui/nav-user"

export function AppMobileSidebar() {
    const router = useRouter()
    const [active, setActive] = React.useState(
        data.navMain.find((item) => item.isActive) || data.navMain[0]
    )

    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
            <ul className="flex items-center justify-around h-14">
                {data.navMain.map((item) => {
                    const isActive = active?.title === item.title
                    return (
                        <li key={item.title}>
                            <button
                                onClick={() => {
                                    setActive(item)
                                    router.push(item.url)
                                }}
                                className={cn(
                                    "flex flex-col items-center text-xs transition-colors p-3",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                            </button>
                        </li>
                    )
                })}

                <NavUser user={data.user} />
            </ul>
        </nav>
    )
}
