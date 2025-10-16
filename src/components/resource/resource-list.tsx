"use client";

import { ResourceDTO } from "@/interface/resource";
import { ResourceCard } from "./resource-card";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function ResourceList({
  resources,
  isOwner,
}: {
  resources: ResourceDTO[];
  isOwner: boolean;
}) {
  const router = useRouter();
  if (!resources.length) {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col space-y-4 py-8">
        <div className="text-center space-y-2">
          <p className="text-2xl font-serif text-muted-foreground">
            No hay recursos ligados a este usuario.
          </p>
          <p className="text-sm text-muted-foreground">
            Crea tu primer recurso para compartir conocimiento
          </p>
        </div>
        <Button
          onClick={() => router.push("/create-resource")}
          className="bg-persian-green hover:bg-persian-green/90 text-white"
        >
          <IconPlus className="h-4 w-4 mr-2" />
          Crear recurso
        </Button>
      </div>
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
