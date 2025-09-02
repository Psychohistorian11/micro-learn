// components/create-resources/StepAreas.tsx
"use client"

import { useEffect, useState } from "react"
import { fetchAreas } from "@/lib/area-service"
import AreaCard from "../../area-card"
import { AreaDTO } from "@/interface/area"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    data: { areas: string[] }
    onUpdate: (newData: { areas: string[] }) => void
}

export default function StepAreas({ data, onUpdate }: Props) {
    const [areas, setAreas] = useState<AreaDTO[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAreas().then(res => {
            setAreas(res)
            setLoading(false)
        })
    }, [])

    const toggleArea = (area: AreaDTO) => {
        let newAreas: string[]
        if (data.areas.includes(area.id)) {
            newAreas = data.areas.filter(id => id !== area.id)
        } else {
            newAreas = [...data.areas, area.id]
        }
        onUpdate({ areas: newAreas })
    }

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
            <h2 className="text-2xl font-serif">Selecciona las áreas relacionadas</h2>

            <div className="flex flex-wrap gap-3">
                {loading
                    ? Array.from({ length: 20 }).map((_, i) => {
                        const randomWidth = Math.floor(Math.random() * (140 - 60 + 1)) + 60 // entre 60 y 140px
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
                            selected={data.areas.includes(area.id)}
                            onClick={() => toggleArea(area)}
                        />
                    ))}

            </div>
        </div>
    )
}
