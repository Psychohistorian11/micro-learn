"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Instagram,
    Smartphone,
    Monitor
} from "lucide-react";
import { SharePreview } from "./share-preview";

interface InstagramShareGuideProps {
    resource: {
        id: string;
        title: string;
        description: string;
        type: string;
        image?: string;
        areas?: Array<{ area: { name: string } }>;
    };
    trigger?: React.ReactNode;
}

export function InstagramShareGuide({ resource, trigger }: InstagramShareGuideProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenInstagram = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            window.open('instagram://', '_blank');
        } else {
            window.open('https://www.instagram.com/', '_blank');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                        <Instagram className="h-4 w-4 mr-1" />
                        <span className="text-sm">Instagram</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-purple-500" />
                        Compartir en Instagram
                    </DialogTitle>
                    <DialogDescription>
                        Sigue estos pasos para compartir el recurso en Instagram
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Preview del recurso usando SharePreview */}
                    <SharePreview resource={resource} />

                    {/* Paso 1: Abrir Instagram */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">

                            <h4 className="font-semibold">Abre Instagram</h4>
                        </div>

                        <Button
                            onClick={handleOpenInstagram}
                            className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                            <Instagram className="h-4 w-4 mr-2" />
                            Abrir Instagram
                        </Button>
                    </div>



                    {/* Botón de cerrar */}
                    <div className="flex justify-end pt-4 border-t">
                        <Button onClick={() => setIsOpen(false)} variant="outline">
                            Entendido
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
