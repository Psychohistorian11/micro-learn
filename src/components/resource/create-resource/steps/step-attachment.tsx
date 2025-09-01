"use client"

import { Label } from "@/components/ui/label"

type Props = {
    data: {
        attachment?: File | null
        image?: File | null
    }
    onUpdate: (values: Partial<Props["data"]>) => void
}

export default function StepAttachment({ data, onUpdate }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            onUpdate({ attachment: e.target.files[0] })
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            onUpdate({ image: e.target.files[0] })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl p-10 cursor-pointer hover:bg-muted/50 transition">
                <Label
                    htmlFor="attachment"
                    className="text-muted-foreground cursor-pointer"
                >
                    {data.attachment
                        ? `Archivo: ${data.attachment.name}`
                        : "Haz click o arrastra tu archivo aquí"}
                </Label>
                <input
                    id="attachment"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="image">Imagen (opcional)</Label>
                <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                {data.image && (
                    <p className="text-sm text-muted-foreground">
                        Imagen seleccionada: {data.image.name}
                    </p>
                )}
            </div>
        </div>
    )
}
