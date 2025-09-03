"use client"

import { useState, useRef, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconEye, IconLink, IconUpload, IconX, IconLoader2 } from "@tabler/icons-react"
import ResourcePreviewSheet from "../resource-preview-sheet"
import { uploadFile } from "@/lib/storage"
import ResourceProps from "@/interface/resource"


export default function StepAttachment({ data, onUpdate }: ResourceProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [urlInput, setUrlInput] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [fileName, setFileName] = useState("")

    const handleFileUpload = async (file: File) => {
        try {
            setIsUploading(true)
            setFileName(file.name)

            const filePath = `attachments/${Date.now()}-${file.name}`
            const url = await uploadFile("resources", filePath, file)

            onUpdate({ attachment: url })
        } catch (err) {
            console.error("Error subiendo archivo:", err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0])
        }
    }

    const handleRemoveAttachment = () => {
        onUpdate({ attachment: '' })
        setUrlInput("")
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

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlInput(e.target.value)
    }

    const hasAttachment = data.attachment !== null && data.attachment !== undefined && data.attachment !== ""
    const isUrl = hasAttachment && typeof data.attachment === "string"

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
            {/* título */}
            <div>
                <Label className="text-2xl font-serif">
                    {data.title}
                </Label>
            </div>

            {/* Zona drag & drop */}
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
                                {data.attachment}
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

            {/* Separador */}
            <div className="flex items-center my-4 w-full">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="mx-4 text-sm text-muted-foreground">O</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            {/* Input URL */}
            <div className="space-y-2">
                <Label>Importación por URL</Label>
                <div className="relative">
                    <IconLink className="absolute left-3 top-1.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="url"
                        placeholder="https://ejemplo.com/archivo.pdf"
                        value={isUrl ? (data.attachment as string) : urlInput}
                        onChange={handleUrlChange}
                        className="pl-10 placeholder:text-sm text-sm"
                        disabled={isUploading || (hasAttachment && !isUrl)}
                        onBlur={() => {
                            if (urlInput.trim() && !hasAttachment) {
                                onUpdate({ attachment: urlInput.trim() })
                            }
                        }}
                    />
                </div>
            </div>

            {/* Preview */}
            <ResourcePreviewSheet
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                attachment={data.attachment}
                title={data.title}
                description={data.description}
            />
        </div>
    )
}
