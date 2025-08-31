"use client"

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { IconLogout } from "@tabler/icons-react";

export default function SignOutGoogleButton() {

    return (
        <div className="text-center w-full">
            <Button
                onClick={() => signOut({ redirectTo: '/login' })}
                className="w-full cursor-pointer text-sm"
                size="icon"
                variant="outline"
            >
                <IconLogout className="mr-2 h-4 " />
                Cerrar sesión
            </Button>
        </div>
    );
}