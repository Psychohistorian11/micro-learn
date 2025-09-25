"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CommunityDTO } from "@/interface/community";
import { ResourceDTO } from "@/interface/resource";
import { CommunityCard } from "../../community/community-card";
import {
    fetchCommunitiesUserById,
} from "@/lib/services/community-service";

interface EditCommunitiesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resource: ResourceDTO;
    onCommunitiesUpdated: (communityIds: string[]) => void;
}

export function EditCommunitiesDialog({
    open,
    onOpenChange,
    resource,
    onCommunitiesUpdated,
}: EditCommunitiesDialogProps) {
    const { data: session } = useSession();
    const [communities, setCommunities] = useState<CommunityDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCommunities, setSelectedCommunities] = useState<string[]>(
        resource.communities?.map((c) => c.id) ?? []
    );

    useEffect(() => {
        if (open && session?.user?.id) {
            loadCommunities();
        }
    }, [open, session?.user?.id]);

    const loadCommunities = async () => {
        try {
            setLoading(true);
            const communitiesData = await fetchCommunitiesUserById(session?.user?.id!);
            setCommunities(communitiesData);
        } catch (error) {
            console.error("Error loading communities:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCommunity = (communityId: string) => {
        let newCommunities: string[];

        if (selectedCommunities.includes(communityId)) {
            newCommunities = selectedCommunities.filter((id) => id !== communityId);
        } else {
            newCommunities = [...selectedCommunities, communityId];
        }

        setSelectedCommunities(newCommunities);
    };

    const handleSave = () => {
        onCommunitiesUpdated(selectedCommunities);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setSelectedCommunities(resource.communities?.map((c) => c.id) ?? []);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">
                        Editar Comunidades
                    </DialogTitle>
                    <DialogDescription>
                        Selecciona las comunidades donde quieres compartir tu recurso. Solo puedes seleccionar comunidades a las que perteneces.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col sm:flex-row gap-4 p-3 rounded-md shadow-sm"
                                >
                                    <Skeleton className="h-[125px] w-full rounded-xl sm:h-12 sm:w-12 sm:rounded-full" />
                                    <div className="flex flex-col justify-center space-y-2 w-full">
                                        <Skeleton className="h-4 w-[85%] sm:w-[300px] lg:w-[400px]" />
                                        <Skeleton className="h-4 w-[70%] sm:w-[240px] lg:w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : communities.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No perteneces a ninguna comunidad</p>
                            <p className="text-sm mt-2">
                                Únete a una comunidad para poder compartir recursos
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {communities.map((community) => (
                                <CommunityCard
                                    key={community.id}
                                    community={community}
                                    selected={selectedCommunities.includes(community.id)}
                                    onClick={() => toggleCommunity(community.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="bg-persian-green hover:bg-persian-green/90"
                    >
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
