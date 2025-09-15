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
    onClick
}: CommunityCardProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-4 p-4 border rounded-lg transition-colors",
                onClick && "cursor-pointer hover:bg-accent/50",
                selected && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={onClick}
        >
            <Avatar className="w-16 h-16 rounded-lg">
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
                <h3 className="font-semibold text-lg leading-tight mb-1">
                    {community.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {community.description}
                </p>
            </div>
        </div>
    );
}