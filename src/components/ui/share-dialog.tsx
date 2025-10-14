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
    Share2,
    MessageCircle,
    Instagram,
    Copy,
    ExternalLink
} from "lucide-react";
import { useShare } from "@/hooks/use-share";
import { toast } from "sonner";
import { InstagramShareGuide } from "./instagram-share-guide";

interface ShareDialogProps {
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

export function ShareDialog({ resource, trigger }: ShareDialogProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Generar URL del recurso
    const resourceUrl = `${window.location.origin}/resource/${resource.id}`;

    // Generar texto para compartir
    const shareText = `🎯 ${resource.title}\n\n${resource.description}\n\n📚 Tipo: ${resource.type}${resource.areas && resource.areas.length > 0
        ? `\n🏷️ Área: ${resource.areas[0].area.name}`
        : ''
        }\n\n🔗 Ver recurso: ${resourceUrl}`;

    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const handleWhatsAppShare = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    const handleInstagramShare = () => {
        // Instagram no tiene API directa para compartir contenido
        // Pero podemos abrir Instagram y mostrar instrucciones
        if (isMobile) {
            // En móvil, intentar abrir Instagram
            window.open('instagram://', '_blank');
            toast.info("Copia el enlace y pégalo en Instagram");
        } else {
            // En desktop, abrir Instagram Web
            window.open('https://www.instagram.com/', '_blank');
            toast.info("Copia el enlace y pégalo en Instagram");
        }
        setIsOpen(false);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(resourceUrl);
            setCopied(true);
            toast.success("Enlace copiado al portapapeles");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Error al copiar el enlace");
        }
    };

    const handleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            toast.success("Texto copiado al portapapeles");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Error al copiar el texto");
        }
    };

    const handleViewResource = () => {
        window.open(resourceUrl, '_blank');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="sm" className="h-8 px-3">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Compartir</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Compartir recurso
                    </DialogTitle>
                    <DialogDescription>
                        Comparte este recurso en tus redes sociales favoritas
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Preview del recurso */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-3">
                            {resource.image && (
                                <img
                                    src={resource.image}
                                    alt={resource.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm line-clamp-2">
                                    {resource.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {resource.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                        {resource.type}
                                    </Badge>
                                    {resource.areas && resource.areas.length > 0 && (
                                        <Badge variant="outline" className="text-xs">
                                            {resource.areas[0].area.name}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Opciones de compartir */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={handleWhatsAppShare}
                            className="h-12 flex flex-col items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-xs">WhatsApp</span>
                        </Button>

                        <InstagramShareGuide
                            resource={resource}
                            trigger={
                                <Button className="h-12 flex flex-col items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                    <Instagram className="h-5 w-5" />
                                    <span className="text-xs">Instagram</span>
                                </Button>
                            }
                        />
                    </div>

                    {/* Acciones adicionales */}
                    <div className="space-y-2">
                        <Button
                            onClick={handleCopyLink}
                            variant="outline"
                            className="w-full justify-start"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar enlace
                        </Button>

                        <Button
                            onClick={handleCopyText}
                            variant="outline"
                            className="w-full justify-start"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar texto completo
                        </Button>

                        <Button
                            onClick={handleViewResource}
                            variant="outline"
                            className="w-full justify-start"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver recurso completo
                        </Button>
                    </div>


                </div>
            </DialogContent>
        </Dialog>
    );
}
