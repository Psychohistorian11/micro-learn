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
    <div>
      <h2 className="text-2xl font-serif pb-2">Recursos</h2>
      <div className="w-full flex flex-col items-start">
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
    </div>
  );
}
