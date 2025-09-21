"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ResourceDTO } from "@/interface/resource";
import { CommunityDTO } from "@/interface/community";
import { searchCommunities, searchResources } from "@/lib/services/search-service";
import { useEffect, useState } from "react";
import { ResourceCardSearch } from "../resource/resource-search-card";
import { CommunityCard } from "../community/community-card";


export function SearchResults({ query }: { query: string }) {
    const router = useRouter();
    const [resources, setResources] = useState<ResourceDTO[]>([]);
    const [communities, setCommunities] = useState<CommunityDTO[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        if (!query) {
            setResources([]);
            setCommunities([]);
            return;
        }

        setLoading(true);
        Promise.all([searchResources(query), searchCommunities(query)])
            .then(([res, com]) => {
                if (active) {
                    setResources(res);
                    setCommunities(com);
                }
            })
            .finally(() => setLoading(false));

        return () => {
            active = false;
        };
    }, [query]);

    return (
        <div className="flex flex-col gap-8 p-4">
            {/* Recursos */}
            <div>
                <h3 className="font-semibold mb-3 text-sm">Recursos</h3>
                {loading && <p className="text-xs text-muted-foreground">Buscando...</p>}
                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.map((res) => (
                            <ResourceCardSearch
                                key={res.id}
                                resource={res}
                                onClick={() => router.push(`/resource/${res.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <p className="text-xs text-muted-foreground">Sin resultados</p>
                    )
                )}
            </div>

            {/* Comunidades */}
            <div>
                <h3 className="font-semibold mb-3 text-sm">Comunidades</h3>
                {loading && <p className="text-xs text-muted-foreground">Buscando...</p>}
                {communities.length > 0 ? (
                    <div className="space-y-3">
                        {communities.map((com) => (
                            <CommunityCard
                                key={com.id}
                                community={com}
                                onClick={() => router.push(`/community/${com.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <p className="text-xs text-muted-foreground">Sin resultados</p>
                    )
                )}
            </div>
        </div>
    );
}
