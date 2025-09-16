"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { UserUpdateDTO } from "@/interface/user";
import FieldError from "../ui/custom/field-error";
import { useRouter } from "next/navigation";

export function EditProfileDialogForm({ user }: { user?: any }) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [open, setOpen] = useState(false); // Control del diálogo

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const dataToSend: UserUpdateDTO = {
      id: user?.id,
      username: data.username,
      description: data.description,
    };

    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.refresh();
        setOpen(false);
      } else {
        const error = await response.json();
        if (response.status == 409) {
          setError("username", { type: "value", message: error.message });
        } else {
          setServerError("Error. Por favor, intenta de nuevo.");
        }
      }
    } catch (error) {
      setServerError("Error. Por favor, intenta de nuevo.");
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <Pencil className="h-5 w-5 text-gray-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Editar perfil</DialogTitle>
            <DialogDescription>
              Actualiza tu información personal. Haz clic en guardar cuando
              termines.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                defaultValue={user?.username ?? ""}
                {...register("username", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es obligatorio",
                  },
                })}
              />
              <FieldError errors={errors} field="username" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                defaultValue={user?.description ?? ""}
                rows={3}
                maxLength={200}
                placeholder="Escribe tu descripción..."
                {...register("description", {
                  required: {
                    value: true,
                    message: "La descripción es obligatoria",
                  },
                })}
              />
              <FieldError errors={errors} field="description" />
            </div>

            {serverError && (
              <p className="text-tiffany-blue text-xs text-center mt-2">
                {serverError}
              </p>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between w-full ">


            <div className="flex gap-2 w-full sm:justify-end">
              <Button type="submit" className="w-full flex sm:flex-row sm:justify-end sm:w-auto bg-persian-green">Guardar cambios</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
