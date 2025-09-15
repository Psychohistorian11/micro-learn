"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

type Props = {
    attachment?: string | null
    className?: string
}

export default function ResourcePreview({ attachment, className }: Props) {
    // Función para detectar si es YouTube
    const isYouTubeUrl = (url: string) =>
        url.includes("youtube.com") || url.includes("youtu.be")

    // Convertir URL de YouTube a embed
    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url)
            if (url.includes("youtube.com/watch")) {
                const videoId = urlObj.searchParams.get("v")
                return `https://www.youtube.com/embed/${videoId}`
            }
            if (url.includes("youtu.be/")) {
                const videoId = urlObj.pathname.split("/")[1]
                return `https://www.youtube.com/embed/${videoId}`
            }
            return url
        } catch {
            return url
        }
    }

    const renderPreview = useMemo(() => {
        if (!attachment) {
            return (
                <p className="text-sm text-muted-foreground text-center">Sin recurso</p>
            )
        }

        const lowerUrl = attachment.toLowerCase()

        // Imagen
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/.test(lowerUrl)) {
            return (
                <img
                    src={attachment}
                    alt="preview"
                    className={cn(
                        "max-h-full border rounded-md object-contain",
                        className
                    )}
                />
            )
        }

        // Audio
        if (/\.(mp3|wav|ogg)$/.test(lowerUrl)) {
            return (
                <audio
                    src={attachment}
                    controls
                    className={cn(
                        "w-full max-h-full border rounded-md object-contain",
                        className
                    )}
                />
            )
        }

        // Video
        if (/\.(mp4|webm|ogg)$/.test(lowerUrl)) {
            return (
                <video
                    src={attachment}
                    controls
                    className={cn(
                        "w-full max-h-full border rounded-md object-contain",
                        className
                    )}
                />
            )
        }

        // Documentos (PDF, Office)
        if (/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt)$/.test(lowerUrl)) {
            return (
                <iframe
                    src={attachment}
                    className={cn(
                        "w-full h-full border rounded-md object-contain",
                        className
                    )}
                    title="doc-preview"
                />
            )
        }

        // YouTube
        if (isYouTubeUrl(lowerUrl)) {
            const embedUrl = getYouTubeEmbedUrl(attachment)
            return (
                <iframe
                    src={embedUrl}
                    className={cn("w-full h-full border rounded-md", className)}
                    title="youtube-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )
        }

        // Vimeo
        if (lowerUrl.includes("vimeo.com")) {
            const vimeoId = lowerUrl.split("/").pop()
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}`}
                    className={cn("w-full h-full border rounded-md", className)}
                    title="vimeo-video"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            )
        }

        // Fallback → iframe genérico
        return (
            <iframe
                src={attachment}
                className={cn("w-full h-full border rounded-md", className)}
                title="url-preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
        )
    }, [attachment, className])

    return <>{renderPreview}</>
}
