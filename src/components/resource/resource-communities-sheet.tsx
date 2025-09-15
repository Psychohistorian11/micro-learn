"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CommunityCard } from "@/components/resource/community-card";
import { fetchCommunitiesByIds } from "@/lib/services/community-service";
import { CommunityDTO } from "@/interface/community";
import { Users } from "lucide-react";

interface ResourceCommunitiesSheetProps {
    resourceId: string;
    communityIds: string[];
    children: React.ReactNode;
}

export function ResourceCommunitiesSheet({
    resourceId,
    communityIds,
    children
}: ResourceCommunitiesSheetProps) {
    const [communities, setCommunities] = useState<CommunityDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpenChange = async (newOpen: boolean) => {
        setOpen(newOpen);

        if (newOpen && communityIds.length > 0 && communities.length === 0) {
            setLoading(true);
            try {
                const fetchedCommunities = await fetchCommunitiesByIds(communityIds);
                setCommunities(fetchedCommunities);
            } catch (error) {
                console.error("Error fetching communities:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (communityIds.length === 0) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Comunidades del Recurso
                    </SheetTitle>
                    <SheetDescription>
                        Comunidades asociadas a este recurso de aprendizaje.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                                    <Skeleton className="w-16 h-16 rounded" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : communities.length > 0 ? (
                        <div className="space-y-4">
                            {communities.map((community) => (
                                <CommunityCard key={community.id} community={community} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No se encontraron comunidades asociadas.</p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
