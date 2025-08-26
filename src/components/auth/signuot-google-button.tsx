"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/lib/auth-actions";
import { IconLogout } from "@tabler/icons-react";

export default function SignOutGoogleButton() {

    const router = useRouter()

    const handleGoogleService = async () => {
        try {

            const result = await handleSignOut();
            console.log(result)

        } catch (error) {
            console.error("Google login error: ", error);
        }
    }

    return (
        <div className="text-center w-full">
            <Button
                className="w-full cursor-pointer text-sm"
                size="icon"
                variant="outline"
                onClick={handleGoogleService}
            >
                <IconLogout className="mr-2 h-4 " />
                Cerrar sesión
            </Button>
        </div>
    );
}