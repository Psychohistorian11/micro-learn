"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { fetchAreas } from "@/lib/services/area-service";
import AreaCard from "../area-card";
import { AreaDTO } from "@/interface/area";
import { ResourceDTO } from "@/interface/resource";

interface EditAreasDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resource: ResourceDTO;
    onAreasUpdated: (areaIds: string[]) => void;
}

export function EditAreasDialog({
    open,
    onOpenChange,
    resource,
    onAreasUpdated,
}: EditAreasDialogProps) {
    const [areas, setAreas] = useState<AreaDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAreas, setSelectedAreas] = useState<string[]>(
        resource.areas?.map((a) => a.area.id) ?? []
    );

    useEffect(() => {
        if (open) {
            loadAreas();
        }
    }, [open]);

    const loadAreas = async () => {
        try {
            setLoading(true);
            const areasData = await fetchAreas();
            setAreas(areasData);
        } catch (error) {
            console.error("Error loading areas:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleArea = (area: AreaDTO) => {
        let newAreas: string[];

        if (selectedAreas.includes(area.id)) {
            newAreas = selectedAreas.filter((id) => id !== area.id);
        } else {
            newAreas = [...selectedAreas, area.id];
        }

        setSelectedAreas(newAreas);
    };

    const handleSave = () => {
        onAreasUpdated(selectedAreas);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setSelectedAreas(resource.areas?.map((a) => a.area.id) ?? []);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">
                        Editar Áreas
                    </DialogTitle>
                    <DialogDescription>
                        Selecciona las áreas relacionadas con tu recurso. Puedes elegir múltiples áreas.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-wrap gap-3">
                            {Array.from({ length: 12 }).map((_, i) => {
                                const randomWidth = Math.floor(Math.random() * (140 - 60 + 1)) + 60;
                                return (
                                    <Skeleton
                                        key={i}
                                        className="h-8 rounded-full"
                                        style={{ width: `${randomWidth}px` }}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {areas.map((area) => (
                                <AreaCard
                                    key={area.id}
                                    area={area}
                                    selected={selectedAreas.includes(area.id)}
                                    onClick={() => toggleArea(area)}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && areas.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No hay áreas disponibles</p>
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
