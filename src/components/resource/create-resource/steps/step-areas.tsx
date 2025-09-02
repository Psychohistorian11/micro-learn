// components/create-resources/StepAreas.tsx
"use client"

import { useEffect, useState } from "react"
//import { fetchAreas} from "@/lib/area-service"
import AreaCard from "../../area-card"
import { AreaDTO } from "@/interface/area"

export default function StepAreas() {
    const [areas, setAreas] = useState<AreaDTO[]>([])
    const [selectedAreas, setSelectedAreas] = useState<AreaDTO[]>([])

    useEffect(() => {
        //fetchAreas().then(setAreas)
    }, [])

    const toggleArea = (area: AreaDTO) => {
        if (selectedAreas.some(a => a.id === area.id)) {
            setSelectedAreas(selectedAreas.filter(a => a.id !== area.id))
        } else {
            setSelectedAreas([...selectedAreas, area])
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Selecciona las áreas relacionadas</h2>

            {/* Grid de áreas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {areas.map(area => (
                    <AreaCard
                        key={area.id}
                        area={area}
                        selected={selectedAreas.some(a => a.id === area.id)}
                        onClick={() => toggleArea(area)}
                    />
                ))}
            </div>

            {/* Áreas seleccionadas */}
            {selectedAreas.length > 0 && (
                <div>
                    <h3 className="text-md font-medium mb-2">Áreas seleccionadas:</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedAreas.map(area => (
                            <AreaCard key={area.id} area={area} selected />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
