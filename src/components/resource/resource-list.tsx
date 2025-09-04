"use client";

import { ResourceDTO } from "@/interface/resource";
import { ResourceCard } from "./resource-card";

export function ResourceList({ resources }: { resources: ResourceDTO[] }) {
  if (!resources.length) {
    return (
      <p className="text-gray-400 text-center mt-10">
        Este usuario aún no ha creado recursos.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {resources.map((res: any, index: number) => (
        <ResourceCard key={res.id ?? index} resource={res} />
      ))}
    </div>
  );
}
