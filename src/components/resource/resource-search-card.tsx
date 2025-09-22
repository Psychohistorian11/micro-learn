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
                "border rounded-lg overflow-hidden transition-colors",
                onClick && "cursor-pointer hover:bg-accent/50",
                selected && "border-2 border-tiffany-blue bg-tiffany-blue/5"
            )}
            onClick={onClick}
        >
            {/* Imagen arriba */}
            <div className="aspect-video w-full bg-muted">
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

            {/* Texto debajo */}
            <div className="p-3">
                <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-1">
                    {resource.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {resource.description}
                </p>
            </div>
        </div>
    );
}
