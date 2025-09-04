"use client";

import { ResourceDTO } from "@/interface/resource";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function DeleteResourceController({ resource }: { resource: ResourceDTO }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            // Aquí iría tu llamada real al backend
            console.log("Eliminando recurso:", resource.id);

            // TODO: await deleteResource(resource.id)

        } catch (error) {
            console.error("Error eliminando recurso:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="p-2 rounded-full bg-[--color-snow] text-[--color-night] hover:bg-red-500 hover:text-[--color-snow] transition"
                    aria-label="Eliminar recurso"
                >
                    <IconTrash size={18} />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de borrar este recurso?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. El recurso{" "}
                        <span className="font-semibold">{resource.title}</span> será eliminado de forma permanente.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Eliminando..." : "Confirmar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
