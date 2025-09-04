"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ResourceCreateDTO, ResourceDTO } from "@/interface/resource"
import { navigationCreateResouceData } from "@/lib/data"
import StepBasicData from "../create-resource/steps/step-basic-data"
import StepAttachment from "../create-resource/steps/step-attachment"


type Props = {
    resource: ResourceDTO
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditResourceSheet({ resource, open, onOpenChange }: Props) {
    const form = useForm<ResourceCreateDTO>({
        defaultValues: {
            title: resource.title,
            description: resource.description,
            type: resource.type,
            attachment: resource.attachment,
            image: resource.image,
            isPublic: resource.isPublic,
            areas: resource.areas?.map(a => a.id) ?? [],
            communities: resource.communities?.map(c => c.id) ?? [],
            authorId: resource.authorId,
        },
    })


    const [isSaving, setIsSaving] = useState(false)

    const onSubmit = async (data: any) => {
        try {
            setIsSaving(true)

            const requiredFields = navigationCreateResouceData
                .flatMap(step => step.fieldsToValidate)

            for (const field of requiredFields) {
                if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
                    form.setError(field as any, {
                        type: "manual",
                        message: `El campo ${field} es obligatorio`,
                    })
                    throw new Error(`Campo faltante: ${field}`)
                }
            }

            console.log("Actualizando recurso con:", data)

            // TODO: llamada al backend
            // await updateResource(resource.id, data)

            onOpenChange(false)
        } catch (err) {
            console.error("Error al actualizar:", err)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>

            <SheetContent className="sm:max-w-3xl w-full overflow-y-auto px-4 sm:px-20">
                <SheetTitle></SheetTitle>


                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8 py-6"
                >
                    {/* Datos básicos */}
                    <StepBasicData form={form} />

                    {/* Attachment */}
                    <StepAttachment form={form} />

                    {/* Áreas */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-medium">Áreas</h3>
                        <div className="flex flex-wrap gap-2">
                            {resource.areas?.map(area => (
                                <span
                                    key={area.id}
                                    className="px-3 py-1 rounded-full bg-persian-green/20 text-persian-green text-sm"
                                >
                                    {area.name}
                                </span>
                            ))}
                            {(!resource.areas || resource.areas.length === 0) && (
                                <span className="text-sm text-muted-foreground">Sin áreas asignadas</span>
                            )}
                        </div>
                        <Button type="button" variant="outline" size="sm">
                            Editar áreas
                        </Button>
                    </div>

                    {/* Comunidades */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-medium">Comunidades</h3>
                        <div className="flex flex-wrap gap-2">
                            {resource.communities?.map(c => (
                                <span
                                    key={c.id}
                                    className="px-3 py-1 rounded-full bg-persian-green/20 text-persian-green text-sm"
                                >
                                    {c.name}
                                </span>
                            ))}
                            {(!resource.communities || resource.communities.length === 0) && (
                                <span className="text-sm text-muted-foreground">Sin comunidades asignadas</span>
                            )}
                        </div>
                        <Button type="button" variant="outline" size="sm">
                            Editar comunidades
                        </Button>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-persian-green"
                            disabled={isSaving}
                        >
                            {isSaving ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}
