"use client"

import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SignInGoogleButton() {

    return (
        <div className="text-center w-full">
            <Button
                onClick={() => signIn("google", { redirectTo: '/' })}
                className="w-full cursor-pointer text-sm"
                size="sm"
                variant="outline"

            >
                <IconBrandGoogleFilled className="mr-2 h-4 " />
                Continuar con Google
            </Button>
        </div>
    );
}