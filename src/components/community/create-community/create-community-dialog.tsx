"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { IconUpload, IconX, IconLoader2 } from "@tabler/icons-react";
import { uploadFile } from "@/lib/storage";
import { createCommunity } from "@/lib/services/community-service";
import { CommunityCreateDTO, CommunityDTO } from "@/interface/community";
import { getAuth } from "@/lib/auth-actions";

interface CreateCommunityDialogProps {
    onCommunityCreated?: (community: CommunityDTO) => void;
    children: React.ReactNode;
}

interface CommunityFormData {
    title: string;
    description: string;
    image: string;
    isPublic: boolean;
}

export function CreateCommunityDialog({
    onCommunityCreated,
    children
}: CreateCommunityDialogProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [serverError, setServerError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CommunityFormData>();

    const image = watch("image");

    const handleImageUpload = async (file: File) => {
        try {
            setIsUploading(true);
            setFileName(file.name);
            setServerError("");

            const filePath = `images/${Date.now()}-${file.name}`;
            const url = await uploadFile("communities", filePath, file);

            setValue("image", url);
        } catch (err) {
            console.error("Error subiendo imagen:", err);
            setServerError("Error al subir la imagen. Inténtalo de nuevo.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setValue("image", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit = async (data: CommunityFormData) => {
        try {
            setServerError("");
            const session = await getAuth()

            if (session?.user.id) {

                const communityData: CommunityCreateDTO = {
                    adminId: session?.user.id,
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    isPublic: data.isPublic,
                };
                const newCommunity = await createCommunity(communityData);

                // Reset form and close dialog
                reset();
                setOpen(false);

                // Notify parent component
                onCommunityCreated?.(newCommunity);
            }

        } catch (error) {
            console.error("Error creating community:", error);
            setServerError("Error al crear la comunidad. Inténtalo de nuevo.");
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
            setServerError("");
        }
    };

    useEffect(() => {
        return () => {
            if (image?.startsWith("blob:")) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">Crear Comunidad</DialogTitle>
                    <DialogDescription>
                        Crea una nueva comunidad para compartir recursos y conectar con otros usuarios.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Título */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Nombre de la comunidad</Label>
                        <Input
                            id="title"
                            {...register("title", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres"
                                }
                            })}
                            placeholder="Ej: Python Developers"
                            className="text-base"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            {...register("description", {
                                required: "La descripción es obligatoria",
                                minLength: {
                                    value: 10,
                                    message: "La descripción debe tener al menos 10 caracteres"
                                }
                            })}
                            placeholder="Describe el propósito y temas de tu comunidad..."
                            className="min-h-[100px] resize-none"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
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
                                    <span className="text-sm font-medium">Subiendo {fileName}...</span>
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

                    {/* Visibilidad */}
                    <div className="space-y-2">
                        <Label htmlFor="isPublic">Visibilidad de la comunidad</Label>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <div className="font-medium">
                                    {watch("isPublic") ? "Comunidad Pública" : "Comunidad Privada"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {watch("isPublic")
                                        ? "Cualquier usuario puede unirse directamente"
                                        : "Los usuarios necesitan solicitar unirse y ser aprobados"
                                    }
                                </div>
                            </div>
                            <Switch
                                id="isPublic"
                                checked={watch("isPublic")}
                                onCheckedChange={(checked) => setValue("isPublic", checked)}
                            />
                        </div>
                    </div>

                    {/* Error del servidor */}
                    {serverError && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                            {serverError}
                        </div>
                    )}

                    <DialogFooter className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-persian-green hover:bg-persian-green/90"
                            disabled={isSubmitting || isUploading}
                        >
                            {isSubmitting ? "Creando..." : "Crear comunidad"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
