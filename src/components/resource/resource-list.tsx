"use client";

import { ResourceDTO } from "@/interface/resource";
import { ResourceCard } from "./resource-card";

export function ResourceList({ resources }: { resources: ResourceDTO[] }) {
  if (!resources.length) {
    return (
      <p className="text-center mt-10 text-2xl font-serif">
        Este usuario aún no ha creado recursos.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <h2 className="text-2xl font-serif">Recursos</h2>
      {resources.map((res: any, index: number) => (
        <ResourceCard key={res.id ?? index} resource={res} />
      ))}
    </div>
  );
}
