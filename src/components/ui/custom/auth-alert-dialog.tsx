"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AuthAlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLogin: () => void;
    title?: string;
    description?: string;
    loginButtonText?: string;
    cancelButtonText?: string;
}

export function AuthAlertDialog({
    open,
    onOpenChange,
    onLogin,
    title = "Inicia sesión",
    description = "Necesitas estar logueado para realizar esta acción.",
    loginButtonText = "Ir a login",
    cancelButtonText = "Cancelar",
}: AuthAlertDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)}>
                        {cancelButtonText}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onLogin} className="bg-persian-green">
                        {loginButtonText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
