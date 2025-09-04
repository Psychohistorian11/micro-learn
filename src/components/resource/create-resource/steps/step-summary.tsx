"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconEye } from "@tabler/icons-react"
import ResourcePreviewSheet from "../resource-preview-sheet"
import { useState, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"
import { AreaDTO } from "@/interface/area"
import { fetchAreasByIds } from "@/lib/area-service"
import { Skeleton } from "@/components/ui/skeleton"
import AreaCard from "../../area-card"

type Props = {
    form: UseFormReturn<ResourceCreateDTO>
}

export default function StepSummary({ form }: Props) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [areas, setAreas] = useState<AreaDTO[]>([])
    const [loading, setLoading] = useState(true)

    const data = form.getValues()

    useEffect(() => {
        const fetchSelectedAreas = async () => {
            if (data.areas && data.areas.length > 0) {
                try {
                    setLoading(true)
                    const areasData = await fetchAreasByIds(data.areas)
                    setAreas(areasData)
                } catch (error) {
                    console.error("Error fetching areas:", error)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        fetchSelectedAreas()
    }, [data.areas])

    return (
        <div className="flex flex-col gap-8 h-full justify-center">
            <h2 className="text-2xl font-serif">{data.title || "_"}</h2>

            <div className="flex flex-col gap-2 rounded-md shadow-sm">
                {data.image ? (
                    <div className="flex sm:flex-row flex-col w-full gap-4 items-start">
                        <img
                            src={data.image}
                            alt="Imagen del recurso"
                            className="w-full h-64 sm:w-32 sm:h-32 object-cover rounded-md border"
                        />

                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-sm">{data.description}</span>
                            <div className="flex flex-row gap-4">
                                <span className="font-sans text-base ">
                                    Visibilidad:{" "}
                                    <span className=" text-persian-green">
                                        {data.isPublic ? "Público" : "Privado"}
                                    </span>
                                </span>
                                <span className="font-sans text-base">
                                    Tipo:{" "}
                                    <span className="text-persian-green">
                                        {data.type}
                                    </span>
                                </span>
                                <Button
                                    size="sm"
                                    className="bg-persian-green ml-auto"
                                    onClick={() => setIsPreviewOpen(true)}
                                >
                                    <IconEye className="w-4 h-4 mr-1" /> Previsualizar
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className="text-sm">{data.description}</span>
                        <div className="flex flex-row gap-4">
                            <span className="font-sans text-base ">
                                Visibilidad:{" "}
                                <span className=" text-persian-green">
                                    {data.isPublic ? "Público" : "Privado"}
                                </span>
                            </span>
                            <span className="font-sans text-base">
                                Tipo:{" "}
                                <span className="text-persian-green">
                                    {data.type}
                                </span>
                            </span>
                            <Button
                                size="sm"
                                className="bg-persian-green ml-auto"
                                onClick={() => setIsPreviewOpen(true)}
                            >
                                <IconEye className="w-4 h-4 mr-1" /> Previsualizar
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2  rounded-md shadow-sm">
                {loading ? (
                    <div className="flex flex-wrap gap-3">
                        {Array.from({ length: 3 }).map((_, i) => {
                            const randomWidth = Math.floor(Math.random() * (140 - 60 + 1)) + 60
                            return (
                                <Skeleton
                                    key={i}
                                    className="h-5 rounded-sm"
                                    style={{ width: `${randomWidth}px` }}
                                />
                            )
                        })}
                    </div>
                ) : areas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                            <AreaCard
                                key={area.id}
                                area={area}
                                selected={true}
                            />
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