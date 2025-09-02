"use client"

import { useState, useRef, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconEye, IconLink, IconUpload, IconX } from "@tabler/icons-react"
import ResourcePreviewSheet from "../resource-preview-sheet"

type Props = {
    data: {
        title?: string
        description: string
        attachment?: File | string | null
    }
    onUpdate: (values: Partial<Props["data"]>) => void
}

export default function StepAttachment({ data, onUpdate }: Props) {
    const [isDragging, setIsDragging] = useState(false)
    const [urlInput, setUrlInput] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            onUpdate({ attachment: e.target.files[0] })
        }
    }

    const handleRemoveAttachment = () => {
        onUpdate({ attachment: null })
        setUrlInput("")
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
            onUpdate({ attachment: e.dataTransfer.files[0] })
        }
    }, [onUpdate])



    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlInput(e.target.value)
    }

    const hasAttachment = data.attachment !== null && data.attachment !== undefined
    const isFile = hasAttachment && typeof data.attachment !== 'string'
    const isUrl = hasAttachment && typeof data.attachment === 'string'

    return (
        <div className="flex flex-col gap-6  h-full justify-center">
            {/* título */}
            <div>
                <Label className="text-2xl font-serif">
                    {data.title}
                </Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 flex-wrap justify-between sm:justify-center">

                <label
                    htmlFor="attachment"
                    className={`flex-1 sm:h-48 flex flex-col items-center justify-center
                        border-2 border-dashed rounded-xl 
                        cursor-pointer transition text-center p-3
                        ${hasAttachment && isFile
                            ? "border-persian-green bg-persian-green/10 text-persian-green"
                            : isDragging && !hasAttachment
                                ? "border-persian-green bg-persian-green/10"
                                : hasAttachment
                                    ? " cursor-not-allowed"
                                    : "border-muted-foreground/30 hover:bg-muted/50"
                        }`}
                    onDragOver={hasAttachment ? undefined : handleDragOver}
                    onDragLeave={hasAttachment ? undefined : handleDragLeave}
                    onDrop={hasAttachment ? undefined : handleDrop}
                >
                    {hasAttachment && isFile ? (
                        <div className="flex flex-col items-center gap-2">
                            <IconUpload className="h-10 w-10" />
                            <span className="text-sm font-medium">
                                Archivo: {(data.attachment as File).name}
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
                    ) : hasAttachment && isUrl ? (
                        <div className="flex flex-col items-center gap-2">
                            <IconLink className="h-10 w-10 text-persian-green" />
                            <span className="text-sm font-medium text-persian-green">
                                URL: {(data.attachment as string)}
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
                        disabled={hasAttachment}
                    />
                </label>
            </div>

            <div className="flex items-center my-4 w-full">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="mx-4 text-sm text-muted-foreground">O</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <div className="space-y-2">
                <Label >Importación por URL</Label>

                <div className="relative">
                    <IconLink className="absolute left-3 top-1.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="url"
                        placeholder="https://ejemplo.com/archivo.pdf"
                        value={isUrl ? (data.attachment as string) : urlInput}
                        onChange={handleUrlChange}
                        className="pl-10 placeholder:text-sm text-sm"
                        disabled={hasAttachment && !isUrl}
                        onBlur={() => {
                            if (urlInput.trim() && !hasAttachment) {
                                onUpdate({ attachment: urlInput.trim() })
                            }
                        }}
                    />
                </div>
            </div>

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