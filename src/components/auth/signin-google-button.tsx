"use client"

import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { handleGoogle } from "@/lib/auth-actions";

export default function SignInGoogleButton() {

    const router = useRouter()

    const handleGoogleService = async () => {
        try {

            const result = await handleGoogle();

            if (result.ok) {
                router.refresh();
                router.push("/home");
            } else {
                console.error("Error de autenticación:", result.error);
            }

        } catch (error) {
            console.error("Google login error: ", error);
        }
    }

    return (
        <div className="text-center w-full">
            <Button
                className="w-full cursor-pointer text-sm"
                size="sm"
                variant="outline"
                onClick={handleGoogleService}
            >
                <IconBrandGoogleFilled className="mr-2 h-4 " />
                Continuar con Google
            </Button>
        </div>
    );
}