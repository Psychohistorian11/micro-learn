"use client"

import { useEffect, useState } from "react"
import { fetchAreas } from "@/lib/services/area-service"
import AreaCard from "../../area-card"
import { AreaDTO } from "@/interface/area"
import { Skeleton } from "@/components/ui/skeleton"
import { UseFormReturn } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"

type Props = {
    form: UseFormReturn<ResourceCreateDTO>
}

export default function StepAreas({ form }: Props) {
    const { watch, setValue } = form
    const [areas, setAreas] = useState<AreaDTO[]>([])
    const [loading, setLoading] = useState(true)

    const selectedAreas = watch("areas") ?? []

    useEffect(() => {
        fetchAreas().then(res => {
            setAreas(res)
            setLoading(false)
        })
    }, [])

    const toggleArea = (area: AreaDTO) => {
        let newAreas: string[]

        if (selectedAreas.includes(area.id)) {
            newAreas = selectedAreas.filter(id => id !== area.id)
        } else {
            newAreas = [...selectedAreas, area.id]
        }

        setValue("areas", newAreas, { shouldValidate: false })
    }

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
            <h2 className="text-2xl font-serif">Selecciona las áreas relacionadas</h2>

            <div className="flex flex-wrap gap-3">
                {loading
                    ? Array.from({ length: 20 }).map((_, i) => {
                        const randomWidth = Math.floor(Math.random() * (140 - 60 + 1)) + 60
                        return (
                            <Skeleton
                                key={i}
                                className="h-5 rounded-sm"
                                style={{ width: `${randomWidth}px` }}
                            />
                        )
                    })
                    : areas.map(area => (
                        <AreaCard
                            key={area.id}
                            area={area}
                            selected={selectedAreas.includes(area.id)}
                            onClick={() => toggleArea(area)}
                        />
                    ))}
            </div>
        </div>
    )
}
