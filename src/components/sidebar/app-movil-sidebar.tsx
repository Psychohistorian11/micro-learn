"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { navigationBarData } from "@/lib/data"
import { NavUser } from "../ui/nav-user"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useSession } from "next-auth/react"

export function AppMobileSidebar() {
    const router = useRouter()
    const { data: session } = useSession()
    const [active, setActive] = React.useState(
        navigationBarData.navMain.find((item) => item.isActive) || navigationBarData.navMain[0]
    )
    const [showDialog, setShowDialog] = React.useState(false)



    async function handleClick(item: (typeof navigationBarData.navMain)[0]) {
        if (item.title === "Create") {
            if (session?.user?.id) {
                setActive(item)
                router.push(item.url)
            } else {
                setShowDialog(true)
            }
        } else {
            setActive(item)
            router.push(item.url)
        }
    }

    return (
        <>
            <nav className="sticky bottom-0 left-0 w-full bg-background md:hidden mt-auto">
                <ul className="flex items-center justify-around h-14">
                    {navigationBarData.navMain.map((item) => {
                        const isActive = active?.title === item.title
                        return (
                            <li key={item.title}>
                                <button
                                    onClick={() => handleClick(item)}
                                    className={cn(
                                        "relative flex flex-col items-center text-xs transition-all duration-300 ease-in-out p-3 pt-1",
                                        isActive
                                            ? "text-persian-green scale-110"
                                            : "text-muted-foreground hover:text-foreground hover:scale-105"
                                    )}
                                >
                                    {isActive && (
                                        <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-persian-green animate-bounce" />
                                    )}

                                    <item.icon
                                        className={cn(
                                            "h-5 w-5 transition-all duration-300 ease-in-out",
                                            isActive ? "h-7 w-7" : "h-5 w-5"
                                        )}
                                    />
                                </button>
                            </li>
                        )
                    })}

                    <NavUser user={navigationBarData.user} />
                </ul>
            </nav>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Inicia sesión</AlertDialogTitle>
                        <AlertDialogDescription>
                            Necesitas estar logueado para crear un recurso.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-persian-green"
                            onClick={() => {
                                setShowDialog(false)
                                router.push("/login")
                            }}
                        >
                            Ir a login
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}