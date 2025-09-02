"use client";

import { ResourceDTO, ResourceType } from "@/interface/resource";
import { ModeToggle } from "../ui/mode-toggle";

export function ResourceCard({ resource }: { resource: ResourceDTO }) {
  function renderPreview() {
    switch (resource.type) {
      case ResourceType.Video:
        return (
          <div className="w-full flex justify-center items-center bg-[--color-night] rounded-lg overflow-hidden">
            <iframe
              className="w-[480px] h-[320px] rounded-lg"
              src={resource.attachment}
              allowFullScreen
            />
          </div>
        );

      case ResourceType.Podcast:
        return (
          <div className="flex justify-center">
            <audio
              controls
              src={resource.attachment}
              className="w-full max-w-md"
            />
          </div>
        );

      case ResourceType.Slides:
        return (
          <a
            href={resource.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-48 rounded-lg bg-[--color-persian-green] text-[--color-snow] font-medium hover:bg-[--color-tiffany-blue] hover:text-[--color-night] transition"
          >
            📑 Ver presentación
          </a>
        );
      case ResourceType.Infography:
        return (
          <div className="w-full h-64 flex items-center justify-center bg-[--color-night] rounded-lg overflow-hidden">
            <img
              src={resource.image}
              alt={resource.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        );

      case ResourceType.Text:
        return (
          <div className="w-full h-64 rounded-lg overflow-hidden flex flex-col">
            <iframe src={resource.attachment} className="flex-1 w-full" />
            <a
              href={resource.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 text-sm font-medium text-[--color-snow] bg-[--color-persian-green] hover:bg-[--color-tiffany-blue] hover:text-[--color-night] transition"
            >
              🔗 Abrir en pestaña nueva
            </a>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="bg-[--color-jet] border border-[--color-persian-green] rounded-xl shadow-md flex flex-col overflow-hidden min-h-[250px] min-w-4xl">
      {/* Preview */}
      <div className="p-3">{renderPreview()}</div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 p-4">
        {/* Tipo y Privacidad */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold px-2 py-1 rounded-md bg-[--color-persian-green] text-[--color-snow]">
            {resource.type}
          </span>
          {!resource.isPublic && (
            <span className="text-sm px-2 py-1 rounded-md bg-red-500/20 text-red-400 font-medium">
              Privado
            </span>
          )}
        </div>

        {/* Título y descripción */}
        <div>
          <h3 className="text-lg font-bold text-[--color-snow]">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3">
            {resource.description}
          </p>
        </div>
        {/* Áreas y Comunidades */}
        <div className="flex flex-wrap gap-2 mt-2">
          {resource.areas?.map((area) => (
            <span
              key={area.id}
              className="bg-[--color-tiffany-blue] text-[--color-night] text-xs px-2 py-1 rounded-full"
            >
              {area.name}
            </span>
          ))}

          {resource.communities?.map((comm) => (
            <span
              key={comm.id}
              className="bg-[--color-persian-green] text-[--color-snow] text-xs px-2 py-1 rounded-full"
            >
              {comm.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
