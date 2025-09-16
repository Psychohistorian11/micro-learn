"use client"

import { useState, useRef, useCallback, ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconEye, IconLink, IconUpload, IconX, IconLoader2 } from "@tabler/icons-react"
import ResourcePreviewSheet from "../resource-preview-sheet"
import { uploadFile } from "@/lib/storage"
import { UseFormReturn } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"

type Props = {
    form: UseFormReturn<ResourceCreateDTO>
}

export default function StepAttachment({ form }: Props) {
    const { watch, setValue, register, formState: { errors } } = form

    const [isDragging, setIsDragging] = useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [fileName, setFileName] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const attachment = watch("attachment")
    const hasAttachment = !!attachment
    const isUrl = hasAttachment && typeof attachment === "string"

    const handleFileUpload = async (file: File) => {
        try {
            setIsUploading(true)
            setFileName(file.name)

            const filePath = `attachments/${Date.now()}-${file.name}`
            const url = await uploadFile("resources", filePath, file)

            setValue("attachment", url, { shouldValidate: true })
        } catch (err) {
            console.error("Error subiendo archivo:", err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0])
        }
    }

    const handleRemoveAttachment = () => {
        setValue("attachment", "", { shouldValidate: true })
        setFileName("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handlePreview = () => {
        setIsPreviewOpen(true)
    }

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files?.[0]) {
            handleFileUpload(e.dataTransfer.files[0])
        }
    }, [])

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
            <div>
                <Label className="text-2xl font-serif">Adjuntar recurso</Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 flex-wrap justify-between sm:justify-center">
                <label
                    htmlFor="attachment"
                    className={`flex-1 sm:h-48 flex flex-col items-center justify-center
            border-2 border-dashed rounded-xl 
            cursor-pointer transition text-center p-3
            ${hasAttachment
                            ? "border-persian-green bg-persian-green/10 text-persian-green"
                            : isDragging
                                ? "border-persian-green bg-persian-green/10"
                                : "border-muted-foreground/30 hover:bg-muted/50"
                        }`}
                    onDragOver={hasAttachment ? undefined : handleDragOver}
                    onDragLeave={hasAttachment ? undefined : handleDragLeave}
                    onDrop={hasAttachment ? undefined : handleDrop}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2 text-persian-green">
                            <IconLoader2 className="h-10 w-10 animate-spin" />
                            <span className="text-sm font-medium">Subiendo {fileName}...</span>
                        </div>
                    ) : hasAttachment && isUrl ? (
                        <div className="flex flex-col items-center gap-2">
                            <IconLink className="h-10 w-10 text-persian-green" />
                            <span className="text-sm font-medium text-persian-green break-all">
                                {attachment}
                            </span>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handlePreview}
                                    className="bg-persian-green"
                                >
                                    <IconEye className="h-4 w-4 mr-1" />
                                    Previsualizar
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveAttachment}
                                    className="text-persian-green hover:bg-persian-green/20"
                                >
                                    <IconX className="h-4 w-4 mr-1" />
                                    Retirar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <IconUpload className="h-10 w-10 text-muted-foreground" />
                            <span className="text-muted-foreground text-sm">
                                Haz click o arrastra tu archivo aquí
                            </span>
                        </div>
                    )}
                    <input
                        id="attachment"
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading || hasAttachment}
                    />
                </label>
            </div>

            <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="mx-4 text-sm text-muted-foreground">O</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <div className="space-y-2 w-full">
                <Label>Importación por URL</Label>
                <div className="relative">
                    <IconLink className="absolute left-3 top-1.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="url"
                        placeholder="https://mirecurso.com/archivo.pdf"
                        className="pl-10 placeholder:text-sm text-sm"
                        disabled={isUploading || (hasAttachment && !isUrl)}
                        {...register("attachment", {
                            required: "Debes adjuntar un archivo o ingresar una URL", // ← Agregar esto
                            pattern: {
                                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                                message: "Debe ser un enlace válido (http o https)"
                            }
                        })}
                    />
                </div>
                {errors.attachment && (
                    <p className="text-sm text-red-500">{errors.attachment.message as string}</p>
                )}
            </div>

            <ResourcePreviewSheet
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                attachment={attachment}
                title={watch("title")}
                description={watch("description")}
            />
        </div>
    )
}
