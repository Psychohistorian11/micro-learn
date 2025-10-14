"use client";

import { useEffect, useState } from "react";
import AreaCard from "@/components/resource/area-card";
import { AreaDTO } from "@/interface/area";
import { fetchAreas } from "@/lib/services/area-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Filter, X } from "lucide-react";

type AreasFilterProps = {
  selected: string[];
  onChange: (ids: string[]) => void;
};

export default function AreasFilter({ selected, onChange }: AreasFilterProps) {
  const [areas, setAreas] = useState<AreaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await fetchAreas();
        setAreas(list);
      } catch (err) {
        console.error("Failed to load areas for filter", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  function toggle(area: AreaDTO) {
    if (selected.includes(area.id)) {
      onChange(selected.filter((id) => id !== area.id));
    } else {
      onChange([...selected, area.id]);
    }
  }

  function clearAll() {
    onChange([]);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 px-3 text-xs gap-2"
      >
        <Filter className="h-3 w-3" />
        Áreas
        {selected.length > 0 && (
          <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs min-w-[18px] h-[18px] flex items-center justify-center">
            {selected.length}
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">
              Filtrar por Áreas
            </DialogTitle>
            <DialogDescription>
              Selecciona las áreas para filtrar los resultados de búsqueda. 
              Deja vacío para buscar en todas las áreas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">
                Cargando áreas...
              </div>
            ) : areas.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No hay áreas disponibles
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {areas.map((area) => (
                  <AreaCard
                    key={area.id}
                    area={area}
                    selected={selected.includes(area.id)}
                    onClick={() => toggle(area)}
                  />
                ))}
              </div>
            )}

            {selected.length > 0 && (
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {selected.length} área{selected.length !== 1 ? 's' : ''} seleccionada{selected.length !== 1 ? 's' : ''}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearAll}
                  className="h-8 px-3"
                >
                  <X className="h-3 w-3 mr-1" />
                  Limpiar todo
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="bg-persian-green hover:bg-persian-green/90"
            >
              Aplicar filtros
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


