"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ResourceDTO } from "@/interface/resource";
import { CommunityDTO } from "@/interface/community";
import { search } from "@/lib/services/search-service";
import { useEffect, useState } from "react";
import { ResourceCardSearch } from "../resource/resource-search-card";
import { CommunityCard } from "../community/community-card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { query: string; areas?: string[] };

export function SearchResults({ query, areas = [] }: Props) {
  const router = useRouter();
  const [resources, setResources] = useState<ResourceDTO[]>([]);
  const [communities, setCommunities] = useState<CommunityDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    let active = true;
    if (!query) {
      setResources([]);
      setCommunities([]);
      return;
    }

    setLoading(true);
    setVisibleCount(3);
    const areas_ids = areas && areas.length > 0 ? areas : [];
    console.log("areas_ids", areas_ids);
    search(query, areas_ids)
      .then((res) => {
        if (res) {
          setResources(res.resources);
          setCommunities(res.communities);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      active = false;
    };
  }, [query, JSON.stringify(areas)]);

  return (
    <div className="flex flex-col gap-10 p-4">
      {/* Recursos */}
      <div>
        <h3 className="font-serif mb-4 text-xl border-b-1">Recursos</h3>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row border overflow-hidden shadow-sm p-4"
              >
                <Skeleton className="w-full sm:w-1/3 aspect-video sm:aspect-auto" />
                <div className="flex-1 px-4 space-y-2 mt-2 sm:mt-0">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : resources.length > 0 ? (
          <div className="flex flex-col gap-4">
            {resources.slice(0, visibleCount).map((res) => (
              <ResourceCardSearch
                key={res.id}
                resource={res}
                onClick={() => router.push(`/resource/${res.id}`)}
              />
            ))}
            {visibleCount < resources.length && (
              <button
                className="self-center mt-1 text-sm px-4 py-2 rounded-md border bg-accent hover:bg-accent/80 transition"
                onClick={() =>
                  setVisibleCount((v) => Math.min(v + 10, resources.length))
                }
              >
                Ver más
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Sin resultados</p>
        )}
      </div>

      {/* Comunidades */}
      <div>
        <h3 className="font-serif mb-4 text-xl border-b-1">Comunidades</h3>

        {loading ? (
          <div className="space-y-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border p-2 shadow-sm flex gap-4 ">
                <Skeleton className="h-16 w-16 rounded-lg mb-3" />
                <div className="w-full flex flex-col justify-center items-start">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : communities.length > 0 ? (
          <div className="space-y-2 gap-2">
            {communities.map((com) => (
              <CommunityCard
                key={com.id}
                community={com}
                onClick={() => router.push(`/community/${com.id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Sin resultados</p>
        )}
      </div>
    </div>
  );
}
