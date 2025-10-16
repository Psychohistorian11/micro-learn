"use client";

import { ResourceDTO } from "@/interface/resource";
import { cn } from "@/lib/utils";

interface ResourceCardSearchProps {
    resource: ResourceDTO;
    selected?: boolean;
    onClick?: () => void;
}

export function ResourceCardSearch({
    resource,
    selected = false,
    onClick,
}: ResourceCardSearchProps) {
    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row border overflow-hidden shadow-sm transition hover:shadow-md",
                onClick && "cursor-pointer hover:bg-accent/30",
                selected && "border-2 border-tiffany-blue bg-tiffany-blue/5"
            )}
            onClick={onClick}
        >
            {/* Imagen a la izquierda en desktop */}
            <div className="w-full sm:w-1/3 bg-muted aspect-video sm:aspect-auto flex-shrink-0">
                {resource.image ? (
                    <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="font-serif text-base mb-1 line-clamp-1 h-6">
                    {resource.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-3 h-[30px]">
                    {resource.description}
                </p>
            </div>
        </div>
    );
}
