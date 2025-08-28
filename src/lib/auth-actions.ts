"use server";

import { signIn, signOut } from "../../auth";


export async function handleGoogle() {
    try {
        await signIn("google", { redirectTo: "/home" });
        return { ok: true, error: null };
    } catch (error) {
        console.error("Error en login con Google:", error);
        return { ok: false, error: error };
    }
}
export async function handleSignOut() {
    await signOut({
        redirectTo: "/",
    });
}
