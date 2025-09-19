"use client";

import { ResourceDTO } from "@/interface/resource";
import { Pencil, Users, Play } from "lucide-react";
import { useState } from "react";
import { EditResourceSheet } from "./edit-resource/edit-resource.controller";
import { DeleteResourceController } from "./delete-resource/delete-resource-controller";
import { ResourceCommunitiesSheet } from "./resource-communities-sheet";
import ResourcePreviewSheet from "./create-resource/resource-preview-sheet";
import { Button } from "@/components/ui/button";
import AreaCard from "./area-card";
import ResourcePreview from "./resource-preview";

export function ResourceCard({
  resource,
  isOwner,
}: {
  resource: ResourceDTO;
  isOwner: boolean;
}) {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);

  const handleEdit = () => setIsEditSheetOpen(true);
  const handlePreview = () => setIsPreviewSheetOpen(true);

  return (
    <>
      <div className="rounded bg-card shadow-sm p-4 w-full">
        <div className="flex items-start gap-4">
          {/* Imagen / preview */}
          <div className="w-60 h-60 flex-shrink-0 overflow-hidden group relative rounded-md border bg-card">
            {resource.image ? (
              <Button
                onClick={handlePreview}
                className="bg-transparent w-full h-full relative overflow-hidden transition-all duration-300 hover:scale-105 focus:ring-2 hover:bg-black/20"
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full transition-transform"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                  <Play className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Button>
            ) : resource.attachment ? (
              <Button
                onClick={handlePreview}
                className="bg-transparent w-full h-full relative overflow-hidden flex items-center justify-center group"
              >
                <div className="absolute inset-0">
                  <ResourcePreview
                    attachment={resource.attachment}
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                  <Play className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Button>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  {resource.type}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold leading-tight mb-1 font-serif">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2 mb-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                    {resource.type}
                  </span>
                  {!resource.isPublic && (
                    <span className="text-xs px-2 py-1 rounded-md bg-red-500/20 text-red-500 font-medium">
                      Privado
                    </span>
                  )}
                </div>
              </div>

              {isOwner && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEdit}
                    className="rounded-full hover:bg-gray-700 bg-transparent"
                    aria-label="Editar recurso"
                  >
                    <Pencil className="h-5 w-5 text-gray-600 hover:text-white" />
                  </Button>
                  <DeleteResourceController resource={resource} />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
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

            <div className="w-60">
              {resource.communities && resource.communities.length > 0 && (
                <ResourceCommunitiesSheet
                  resourceId={resource.id}
                  communityIds={resource.communities.map((c) => c.id)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Ver Comunidades ({resource.communities.length})
                  </Button>
                </ResourceCommunitiesSheet>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sheets */}
      {isOwner && (
        <EditResourceSheet
          resource={resource}
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
        />
      )}

      <ResourcePreviewSheet
        open={isPreviewSheetOpen}
        onClose={() => setIsPreviewSheetOpen(false)}
        attachment={resource.attachment}
        title={resource.title}
        description={resource.description}
      />
    </>
  );
}
