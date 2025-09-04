"use client";

import { ResourceDTO, ResourceType } from "@/interface/resource";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { EditResourceSheet } from "./edit-resource/edit-resource.controller";
import { DeleteResourceController } from "./delete-resource/delete-resource-controller";

export function ResourceCard({ resource }: { resource: ResourceDTO }) {
  const TAG_COLORS = [
    "--color-persian-green",
    "--color-tiffany-blue",
    "--color-jet",
    "--color-night",
  ];

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  function getColorById(id: string) {
    let sum = 0;
    for (let i = 0; i < id.length; i++) {
      sum += id.charCodeAt(i);
    }
    return TAG_COLORS[sum % TAG_COLORS.length];
  }

  function renderPreview() {
    // ... (código existente sin cambios)
  }

  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleDelete = () => {
    // Implementaremos esto después
    console.log("Eliminar recurso:", resource.id);
  };

  return (
    <>
      <div className="bg-[--color-jet] border border-[--color-persian-green] shadow-md flex flex-col overflow-hidden min-h-[250px] w-full relative">
        {/* Botones de acción */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={handleEdit}
            className="p-2 rounded-full bg-[--color-snow] text-[--color-night] hover:bg-[--color-persian-green] hover:text-[--color-snow] transition"
            aria-label="Editar recurso"
          >
            <IconEdit size={18} />
          </button>

          <DeleteResourceController resource={resource} />
        </div>


        <div className="flex flex-col gap-3 p-4">
          <span className="text-md rounded-md bg-[--color-persian-green] text-[--color-snow]">
            {resource.type}
          </span>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif text-[--color-snow]">
                {resource.title}
              </h3>
              {!resource.isPublic && (
                <span className="text-sm px-2 py-1 rounded-md bg-red-500/20 text-red-400 font-medium">
                  Privado
                </span>
              )}
            </div>
            <p className="text-md text-gray-500 line-clamp-3">
              {resource.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {resource.areas?.map((area) => {
              const bg = getColorById(area.id);
              const isDark = bg === "--color-night" || bg === "--color-jet";
              return (
                <span
                  key={area.id}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                  style={{
                    backgroundColor: `var(${bg})`,
                    color: isDark ? "var(--color-snow)" : "var(--color-night)",
                  }}
                >
                  {area.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sheet de edición */}
      <EditResourceSheet
        resource={resource}
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
      />
    </>
  );
}