"use client"

import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SelectTypeResource } from "../select-type-resource"
import { Button } from "@/components/ui/button"
import { IconEye, IconUpload, IconX, IconLoader2 } from "@tabler/icons-react"
import { uploadFile } from "@/lib/storage"
import ResourcePreviewSheet from "../resource-preview-sheet"
import { UseFormReturn } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"

type Props = {
    form: UseFormReturn<ResourceCreateDTO>
}

export default function StepBasicData({ form }: Props) {
    const {
        register,
        setValue,
        watch,
        formState: { errors }
    } = form

    const [isUploading, setIsUploading] = useState(false)
    const [fileName, setFileName] = useState("")
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const image = watch("image")
    const title = watch("title")
    const description = watch("description")
    const type = watch("type")

    const handleImageUpload = async (file: File) => {
        try {
            setIsUploading(true)
            setFileName(file.name)

            const filePath = `images/${Date.now()}-${file.name}`
            const url = await uploadFile("resources", filePath, file)

            setValue("image", url)
        } catch (err) {
            console.error("Error subiendo imagen:", err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleImageUpload(e.target.files[0])
    }

    const handleRemoveImage = () => {
        setValue("image", "")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    useEffect(() => {
        return () => {
            if (image?.startsWith("blob:")) {
                URL.revokeObjectURL(image)
            }
        }
    }, [image])

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
            <div className="w-full">
                <input
                    {...register("title", { required: "El título es obligatorio" })}
                    placeholder="Dale un nombre a tu recurso "
                    className="text-2xl font-serif caret-black dark:caret-white focus:outline-none w-full"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    {...register("description", { required: "La descripción es obligatoria" })}
                    placeholder="..."
                    className="min-h-[100px]"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message as string}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="image"
                    className={`flex-1 flex flex-col items-center justify-center
              border-2 border-dashed rounded-xl cursor-pointer transition overflow-hidden p-3
              ${image
                            ? "border-persian-green bg-persian-green/10"
                            : "border-muted-foreground/30 hover:bg-muted/50"
                        }`}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2 text-persian-green">
                            <IconLoader2 className="h-10 w-10 mt-3 animate-spin" />
                            <span className="text-sm font-medium">Subiendo {fileName}...</span>
                        </div>
                    ) : image ? (
                        <div className="flex flex-col h-full items-center gap-2">
                            <span className="text-sm font-medium mb-1 mt-2 text-persian-green">
                                Imagen subida
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="bg-persian-green"
                                >
                                    <IconEye className="h-4 w-4 mr-1" />
                                    Previsualizar
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveImage}
                                    className="text-persian-green hover:bg-persian-green/20"
                                >
                                    <IconX className="h-4 w-4 mr-1" />
                                    Retirar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <IconUpload className="h-8 w-8 mt-3 text-muted-foreground" />
                            <span className="text-muted-foreground text-sm">
                                Imagen (opcional)
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

            <div className="flex flex-col gap-2">
                <Label>Tipo de recurso</Label>
                <SelectTypeResource
                    value={type}
                    onChange={(val) => setValue("type", val as ResourceCreateDTO["type"], { shouldValidate: true })}
                />
                {errors.type && (
                    <p className="text-red-500 text-sm">{errors.type.message as string}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Switch
                    id="isPublic"
                    checked={!!watch("isPublic")}
                    onCheckedChange={(checked) => setValue("isPublic", checked)}
                />
                <Label htmlFor="isPublic">Mostrar en mi perfil</Label>
            </div>

            <ResourcePreviewSheet
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                attachment={image}
                title={title}
                description={description}
            />
        </div>
    )
}
