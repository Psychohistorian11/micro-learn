"use client";

import { ResourceDTO } from "@/interface/resource";
import { ResourceCard } from "./resource-card";

export function ResourceList({
  resources,
  isOwner,
}: {
  resources: ResourceDTO[];
  isOwner: boolean;
}) {
  if (!resources.length) {
    return (
      <p className="text-center text-2xl font-serif">
        Este usuario aún no ha creado recursos.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <h2 className="text-2xl font-serif">Recursos</h2>
      {resources
        .filter((resource) => resource.isPublic || isOwner)
        .map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isOwner={isOwner}
          />
        ))}

    </div>
  );
}
