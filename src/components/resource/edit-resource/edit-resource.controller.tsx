"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ResourceCreateDTO, ResourceDTO } from "@/interface/resource";
import { navigationCreateResouceData } from "@/lib/data";
import StepBasicData from "../create-resource/steps/step-basic-data";
import StepAttachment from "../create-resource/steps/step-attachment";
import { editResource } from "@/lib/services/resource-service";
import AreaCard from "../area-card";
import { IconEdit } from "@tabler/icons-react";
import { Icon } from "lucide-react";

type Props = {
  resource: ResourceDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditResourceSheet({ resource, open, onOpenChange }: Props) {
  const form = useForm<ResourceCreateDTO>({
    defaultValues: {
      title: resource.title,
      description: resource.description,
      type: resource.type,
      attachment: resource.attachment,
      image: resource.image,
      isPublic: resource.isPublic,
      areas: resource.areas?.map((a) => a.area.id) ?? [],
      communities: resource.communities?.map((c) => c.id) ?? [],
      authorId: resource.authorId,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: ResourceCreateDTO) => {
    try {
      setIsSaving(true);

      const requiredFields = navigationCreateResouceData.flatMap(
        (step) => step.fieldsToValidate
      );

      for (const field of requiredFields as (keyof ResourceCreateDTO)[]) {
        const value = data[field];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          form.setError(field, {
            type: "manual",
            message: `El campo ${field} es obligatorio`,
          });
          throw new Error(`Campo faltante: ${String(field)}`);
        }
      }

      console.log("Actualizando recurso con:", data);

      await editResource(resource.id, data);

      onOpenChange(false);
      // Aquí también podrías refrescar la lista o invalidar cache
    } catch (err) {
      console.error("Error al actualizar:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTitle className="px-4 pt-6 text-2xl font-serif"></SheetTitle>
      <SheetContent className="sm:max-w-1/3 w-full overflow-y-auto px-4 sm:p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 py-6"
        >
          <StepBasicData form={form} />
          <StepAttachment form={form} />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center ">
              <h3 className="font-serif text-2xl">Áreas</h3>
              <Button type="button" variant="outline" size="sm">
                <IconEdit className=" h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.areas?.length ? (
                resource.areas.map((areaData) => (
                  <AreaCard
                    key={areaData.area.id}
                    area={areaData.area}
                    selected={true}
                  />
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Ninguna</span>
              )}
            </div>
          </div>

          {/* Comunidades */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center ">
              <h3 className="font-serif text-2xl">Comunidades</h3>
              <Button type="button" variant="outline" size="sm">
                <IconEdit className=" h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.communities?.map((c) => (
                <span
                  key={c.id}
                  className="px-3 py-1 rounded-full bg-persian-green/20 text-persian-green text-sm"
                >
                  {c.id}
                </span>
              ))}
              {(!resource.communities || resource.communities.length === 0) && (
                <span className="text-sm text-muted-foreground">
                  Sin comunidades asignadas
                </span>
              )}
            </div>
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
  );
}
