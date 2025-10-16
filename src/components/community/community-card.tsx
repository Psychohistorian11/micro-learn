"use client";

import { CommunityDTO } from "@/interface/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CommunityCardProps {
    community: CommunityDTO;
    selected?: boolean;
    onClick?: () => void;
}

export function CommunityCard({
    community,
    selected = false,
    onClick,
}: CommunityCardProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-4 p-2 border transition-colors ",
                onClick && "cursor-pointer hover:bg-accent/50",
                selected && "border-2 border-tiffany-blue ring-primary bg-tiffany-blue/5"
            )}
            onClick={onClick}
        >
            <Avatar className="w-16 h-16 rounded-lg flex-shrink-0">
                <AvatarImage
                    src={community.image}
                    alt={community.title}
                    className="object-cover"
                />
                <AvatarFallback className="rounded-lg text-lg font-serif">
                    {community.title.substring(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                {/* 🔹 Forzar altura del título */}
                <h3 className="font-serif text-base leading-tight mb-1 line-clamp-1 h-6">
                    {community.title}
                </h3>

                {/* 🔹 Forzar altura de la descripción */}
                <p className="text-xs text-muted-foreground line-clamp-2 h-10">
                    {community.description}
                </p>
            </div>
        </div>
    );
}
