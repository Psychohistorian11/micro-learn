import ResourceProps, { ResourceCreateDTO } from "@/interface/resource"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SelectTypeResource } from "../select-type-resource"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function StepBasicData({ data, onUpdate }: ResourceProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        data.image ?? null
    )

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0]
            const url = URL.createObjectURL(file)

            // guardamos string, como pide el DTO
            onUpdate({ image: url })
            setImagePreview(url)
        }
    }

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview)
        }
    }, [imagePreview])

    return (
        <div className="flex flex-col gap-6 h-full justify-center">
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
                    placeholder="Describelo..."
                    className="min-h-[100px]"
                />
            </div>

            {/* Imagen */}
            <div>
                <label
                    htmlFor="image"
                    className="flex-1 h-25 flex items-center justify-center
                border-2 border-dashed border-muted-foreground/30 rounded-xl 
                cursor-pointer hover:bg-muted/50 transition overflow-hidden p-3"
                >
                    {imagePreview ? (
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            width={192}
                            height={192}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-muted-foreground text-sm">
                            Imagen (opcional)
                        </span>
                    )}
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Tipo */}
            <div className="flex flex-col gap-2">
                <Label>Tipo de recurso</Label>
                <SelectTypeResource
                    value={data.type}
                    onChange={(val) => onUpdate({ type: val as ResourceCreateDTO["type"] })}
                />
            </div>

            {/* Público */}
            <div className="flex items-center gap-3">
                <Switch
                    id="isPublic"
                    checked={!!data.isPublic}
                    onCheckedChange={(checked) => onUpdate({ isPublic: checked })}
                />
                <Label htmlFor="isPublic">Mostrar en mi perfil</Label>
            </div>
        </div>
    )
}
