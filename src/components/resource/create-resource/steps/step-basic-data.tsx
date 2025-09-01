"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SelectTypeResource } from "../select-type-resource"

type Props = {
    data: {
        title: string
        type: string
        description: string
        isPublic: boolean
    }
    onUpdate: (values: Partial<Props["data"]>) => void
}

export default function StepBasicData({ data, onUpdate }: Props) {
    return (
        <div className="flex flex-col gap-6">
            {/* Editable title */}
            <div className="w-full">

                <input
                    value={data.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    placeholder="Dale un nombre a tu recurso "
                    className="text-2xl font-serif caret-black dark:caret-white focus:outline-none border-b-2 w-full"

                />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    placeholder="Describe brevemente tu recurso..."
                    className="min-h-[120px]"
                />
            </div>

            {/* Resource type */}
            <div className="flex flex-col gap-2">
                <Label>Tipo de recurso</Label>
                <SelectTypeResource
                    value={data.type}
                    onChange={(val) => onUpdate({ type: val })}
                />
            </div>

            {/* Is public */}
            <div className="flex items-center gap-3">
                <Switch
                    id="isPublic"
                    checked={data.isPublic}
                    onCheckedChange={(checked) => onUpdate({ isPublic: checked })}
                />
                <Label htmlFor="isPublic">Mostrar en mi perfil</Label>
            </div>
        </div>
    )
}
