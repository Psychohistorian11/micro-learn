"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ShareResource {
    id: string;
    title: string;
    description: string;
    type: string;
    image?: string;
    areas?: Array<{ area: { name: string } }>;
}

export function useShare() {
    const [isSharing, setIsSharing] = useState(false);

    const generateShareText = (resource: ShareResource): string => {
        const resourceUrl = `${window.location.origin}/resource/${resource.id}`;

        return `🎯 ${resource.title}

${resource.description}

📚 Tipo: ${resource.type}${resource.areas && resource.areas.length > 0
                ? `\n🏷️ Área: ${resource.areas[0].area.name}`
                : ''
            }

🔗 Ver recurso: ${resourceUrl}`;
    };

    const generateShareUrl = (resource: ShareResource): string => {
        return `${window.location.origin}/resource/${resource.id}`;
    };

    const shareToWhatsApp = async (resource: ShareResource) => {
        try {
            setIsSharing(true);
            const shareText = generateShareText(resource);
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

            window.open(whatsappUrl, '_blank');
            toast.success("Abriendo WhatsApp...");
        } catch (error) {
            toast.error("Error al compartir en WhatsApp");
        } finally {
            setIsSharing(false);
        }
    };

    const shareToInstagram = async (resource: ShareResource) => {
        try {
            setIsSharing(true);
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Primero copiamos el texto al portapapeles automáticamente
            const shareText = generateShareText(resource);
            await navigator.clipboard.writeText(shareText);

            if (isMobile) {
                // En móvil, intentar abrir Instagram
                window.open('instagram://', '_blank');
                toast.success("¡Texto copiado! Abre Instagram y pégalo en tu historia o mensaje directo", {
                    duration: 5000,
                    description: "El texto ya está en tu portapapeles, solo pégalo donde quieras compartirlo"
                });
            } else {
                // En desktop, abrir Instagram Web
                window.open('https://www.instagram.com/', '_blank');
                toast.success("¡Texto copiado! Abre Instagram Web y pégalo en tu historia o mensaje directo", {
                    duration: 5000,
                    description: "El texto ya está en tu portapapeles, solo pégalo donde quieras compartirlo"
                });
            }
        } catch (error) {
            toast.error("Error al abrir Instagram");
        } finally {
            setIsSharing(false);
        }
    };

    const copyToClipboard = async (text: string, successMessage: string = "Copiado al portapapeles") => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(successMessage);
        } catch (error) {
            toast.error("Error al copiar al portapapeles");
        }
    };

    const copyResourceLink = async (resource: ShareResource) => {
        const url = generateShareUrl(resource);
        await copyToClipboard(url, "Enlace copiado al portapapeles");
    };

    const copyResourceText = async (resource: ShareResource) => {
        const text = generateShareText(resource);
        await copyToClipboard(text, "Texto copiado al portapapeles");
    };

    return {
        isSharing,
        shareToWhatsApp,
        shareToInstagram,
        copyResourceLink,
        copyResourceText,
        generateShareText,
        generateShareUrl,
    };
}
