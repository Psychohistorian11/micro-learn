"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconEye, IconLink, IconUpload } from "@tabler/icons-react"
import { ResourceCreateDTO } from "@/interface/resource"
import ResourcePreviewSheet from "../resource-preview-sheet"
import { useState } from "react"

type Props = {
    data: ResourceCreateDTO
}

export default function StepSummary({ data }: Props) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const isFile = data.attachment && typeof data.attachment !== "string"
    const isUrl = data.attachment && typeof data.attachment === "string"

    return (
        <div className="flex flex-col gap-8 h-full justify-center">
            <h2 className="text-2xl font-serif">Resumen del recurso</h2>

            <div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm">
                <Label className="text-lg font-medium text-persian-green">Título</Label>
                <span>{data.title || "—"}</span>

                <Label className="text-lg font-medium text-persian-green mt-4">Descripción</Label>
                <span className="text-sm text-gray-700">{data.description || "—"}</span>
            </div>

            <div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm">
                <Label className="text-lg font-medium text-persian-green">Adjunto</Label>
                {isFile ? (
                    <div className="flex items-center gap-3">
                        <IconUpload className="w-5 h-5 text-persian-green" />
                        <span className="text-sm">
                            {(data.attachment)}
                        </span>
                        <Button
                            size="sm"
                            className="bg-persian-green ml-auto"
                            onClick={() => setIsPreviewOpen(true)}
                        >
                            <IconEye className="w-4 h-4 mr-1" /> Previsualizar
                        </Button>
                    </div>
                ) : isUrl ? (
                    <div className="flex items-center gap-3">
                        <IconLink className="w-5 h-5 text-persian-green" />
                        <span className="text-sm">{data.attachment}</span>
                        <Button
                            size="sm"
                            className="bg-persian-green ml-auto"
                            onClick={() => setIsPreviewOpen(true)}
                        >
                            <IconEye className="w-4 h-4 mr-1" /> Previsualizar
                        </Button>
                    </div>
                ) : (
                    <span className="text-sm text-muted-foreground">No se adjuntó archivo ni URL</span>
                )}
            </div>

            <div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm">
                <Label className="text-lg font-medium text-persian-green">Áreas</Label>
                {data.areas && data.areas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {data.areas.map((a) => (
                            <span
                                key={a}
                                className="px-3 py-1 text-sm rounded-full bg-persian-green/10 text-persian-green border border-persian-green/30"
                            >
                                {a}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-sm text-muted-foreground">Ninguna</span>
                )}
            </div>

            <div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm">
                <Label className="text-lg font-medium text-persian-green">Comunidades</Label>
                {data.communities && data.communities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {data.communities.map((c) => (
                            <span
                                key={c}
                                className="px-3 py-1 text-sm rounded-full bg-persian-green/10 text-persian-green border border-persian-green/30"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-sm text-muted-foreground">Ninguna</span>
                )}
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
