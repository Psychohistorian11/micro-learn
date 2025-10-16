"use client";

import { useState } from "react";
import { SearchResults } from "@/components/search/search_result";
import AreasFilter from "@/components/search/areas-filter";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    return (
        <div className="min-h-screen bg-background p-6 md:pb-6">

            {/* Contenido */}
            <div >
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-serif mb-2">Buscar Recursos</h2>
                        <p className="text-muted-foreground">
                            Encuentra recursos y comunidades que te interesen
                        </p>
                    </div>

                    {/* Barra de búsqueda móvil */}
                    <div className="bg-card rounded-lg border shadow-sm p-4 mb-6">
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar recursos o comunidades..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <AreasFilter selected={selectedAreas} onChange={setSelectedAreas} />
                            </div>
                        </div>
                    </div>

                    {/* Resultados de búsqueda */}
                    <div className="bg-card rounded-lg border shadow-sm">
                        {query ? (
                            <SearchResults query={query} areas={selectedAreas} />
                        ) : (
                            <div className="p-8 text-center">
                                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-xl font-serif mb-2">Comienza a buscar</h3>
                                <p className="text-sm">
                                    Escribe en la barra de búsqueda para encontrar recursos y comunidades
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}