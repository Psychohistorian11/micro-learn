"use server";

import { auth, signOut } from "../../auth";


export async function handleSignOut() {
    await signOut({
        redirectTo: "/",
    });
}

export async function getAuth() {
    const session = await auth()
    return session
}
