"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldError from "@/components/ui/custom/field-error";
import {
  IconLoader2,
  IconUpload,
  IconX,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { uploadFile } from "@/lib/storage";
import { CommunityDTO, CommunityUpdateDTO } from "@/interface/community";
import {
  updateCommunity,
  deleteCommunity,
} from "@/lib/services/community-service";
import { useSession } from "next-auth/react";

interface CommunitySettingsDialogProps {
  community: CommunityDTO;
  onCommunityUpdated: (updatedCommunity: CommunityDTO) => void;
  onCommunityDeleted: () => void;
  children: React.ReactNode;
}

export function CommunitySettingsDialog({
  community,
  onCommunityUpdated,
  onCommunityDeleted,
  children,
}: CommunitySettingsDialogProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [serverError, setServerError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommunityUpdateDTO>({
    defaultValues: {
      id: community.id,
      title: community.title,
      description: community.description,
      image: community.image,
    },
  });

  const image = watch("image");
  const fileName = image ? image.split("/").pop() : "";

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setServerError("");
      const filePath = `communities/${Date.now()}-${file.name}`;
      const url = await uploadFile("communities", filePath, file);
      setValue("image", url, { shouldValidate: true });
    } catch (err) {
      console.error("Error uploading image:", err);
      setServerError("Error al subir la imagen. Intenta de nuevo.");
      setValue("image", "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.id) {
      setServerError("Debes iniciar sesión para editar la comunidad.");
      return;
    }

    setServerError("");
    try {
      const updatedCommunity = await updateCommunity(data);
      onCommunityUpdated(updatedCommunity);
      setOpen(false);
    } catch (err: any) {
      console.error("Error updating community:", err);
      setServerError(
        err.message || "Error al actualizar la comunidad. Intenta de nuevo."
      );
    }
  });

  const handleDeleteCommunity = async () => {
    if (deleteConfirmText !== community.title) {
      setServerError("El nombre de la comunidad no coincide.");
      return;
    }

    if (!session?.user?.id) {
      setServerError("Debes iniciar sesión para eliminar la comunidad.");
      return;
    }

    setIsDeleting(true);
    setServerError("");

    try {
      await deleteCommunity(community.id);
      onCommunityDeleted();
      setOpen(false);
      router.push("/communities");
    } catch (err: any) {
      console.error("Error deleting community:", err);
      setServerError(
        err.message || "Error al eliminar la comunidad. Intenta de nuevo."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setShowDeleteConfirm(false);
      setDeleteConfirmText("");
      setServerError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconSettings className="h-5 w-5" />
            Configuración de la Comunidad
          </DialogTitle>
          <DialogDescription>
            Administra la configuración y elimina la comunidad si es necesario.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Edit Community Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                {...register("title", {
                  required: "El título es obligatorio",
                  minLength: {
                    value: 3,
                    message: "El título debe tener al menos 3 caracteres",
                  },
                })}
                className="col-span-3"
              />
              <FieldError errors={errors} field="title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "La descripción es obligatoria",
                  minLength: {
                    value: 10,
                    message: "La descripción debe tener al menos 10 caracteres",
                  },
                })}
                className="col-span-3 min-h-[100px]"
              />
              <FieldError errors={errors} field="description" />
            </div>

            {/* Imagen */}
            <div className="space-y-2">
              <Label>Imagen de la comunidad (opcional)</Label>
              <label
                htmlFor="image"
                className={`flex-1 flex flex-col items-center justify-center
                border-2 border-dashed rounded-xl cursor-pointer transition overflow-hidden p-6
                ${image
                    ? "border-persian-green bg-persian-green/10"
                    : "border-muted-foreground/30 hover:bg-muted/50"
                  }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-persian-green">
                    <IconLoader2 className="h-10 w-10 animate-spin" />
                    <span className="text-sm font-medium">
                      Subiendo {fileName}...
                    </span>
                  </div>
                ) : image ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Preview functionality could be added here
                        }}
                        className="text-persian-green border-persian-green hover:bg-persian-green/10"
                      >
                        Ver imagen
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="text-red-500 border-red-500 hover:bg-red-500/10"
                      >
                        <IconX className="h-4 w-4 mr-1" />
                        Quitar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <IconUpload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Haz clic para subir una imagen
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG hasta 10MB
                    </span>
                  </div>
                )}

                <input
                  id="image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUploading || !!image}
                />
              </label>
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-persian-green"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>

          {/* Delete Community Section */}
          <div className="border-t pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-destructive mb-2">
                  Zona de Peligro
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Una vez que elimines una comunidad, no hay vuelta atrás. Por
                  favor, ten cuidado.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full"
                >
                  <IconTrash className="h-4 w-4 mr-2" />
                  Eliminar Comunidad
                </Button>
              ) : (
                <div className="space-y-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div>
                    <Label
                      htmlFor="deleteConfirm"
                      className="text-destructive font-medium"
                    >
                      Escribe el nombre de la comunidad para confirmar la
                      eliminación
                    </Label>
                    <Input
                      id="deleteConfirm"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder={community.title}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Escribe <strong>{community.title}</strong> para confirmar
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText("");
                        setServerError("");
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteCommunity}
                      disabled={
                        deleteConfirmText !== community.title || isDeleting
                      }
                      className="flex-1"
                    >
                      {isDeleting ? (
                        <>
                          <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />
                          Eliminando...
                        </>
                      ) : (
                        <>
                          <IconTrash className="h-4 w-4 mr-2" />
                          Eliminar Comunidad
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
