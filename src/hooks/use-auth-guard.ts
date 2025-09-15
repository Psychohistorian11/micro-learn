"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuthGuard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const requireAuth = (callback: () => void, message: string = "Necesitas estar logueado para realizar esta acción.") => {
    if (session?.user?.id) {
      callback();
    } else {
      setShowDialog(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowDialog(false);
    router.push("/login");
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return {
    session,
    showDialog,
    requireAuth,
    handleLoginRedirect,
    closeDialog,
  };
}
