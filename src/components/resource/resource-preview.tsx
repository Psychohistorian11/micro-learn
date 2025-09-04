"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
    attachment: File | string | null
    className?: string
}

export default function ResourcePreview({ attachment, className }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [mimeType, setMimeType] = useState<string | null>(null)

    const isFile = attachment && typeof attachment !== "string"
    const isUrl = attachment && typeof attachment === "string"

    useEffect(() => {
        if (isFile && attachment instanceof File) {
            const url = URL.createObjectURL(attachment)
            setPreviewUrl(url)
            setMimeType(attachment.type)
            return () => URL.revokeObjectURL(url)
        }
        if (isUrl) {
            setPreviewUrl(attachment as string)
            setMimeType(null)
        }
    }, [attachment, isFile, isUrl])

    // Función para detectar si es una URL de YouTube
    const isYouTubeUrl = (url: string) => {
        return url.includes('youtube.com') || url.includes('youtu.be')
    }

    // Función para convertir URL de YouTube a URL embebida
    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url)

            // Para URLs como: https://www.youtube.com/watch?v=VIDEO_ID
            if (url.includes('youtube.com/watch')) {
                const videoId = urlObj.searchParams.get('v')
                return `https://www.youtube.com/embed/${videoId}`
            }

            // Para URLs acortadas: https://youtu.be/VIDEO_ID
            if (url.includes('youtu.be/')) {
                const videoId = urlObj.pathname.split('/')[1]
                return `https://www.youtube.com/embed/${videoId}`
            }

            return url
        } catch {
            return url
        }
    }

    if (!attachment || !previewUrl) {
        return (
            <p className="text-sm text-muted-foreground text-center">Sin recurso</p>
        )
    }

    // --- FILES ---
    if (isFile) {
        if (mimeType?.startsWith("image/")) {
            return <img src={previewUrl} alt="preview" className={cn("w-full h-full rounded-md object-contain border p-2", className)} />
        }
        if (mimeType?.startsWith("audio/")) {
            return <audio src={previewUrl} controls className={cn("w-full h-full rounded-md border object-contain p-2", className)} />
        }
        if (mimeType?.startsWith("video/")) {
            return <video src={previewUrl} controls className={cn("w-full h-full rounded-md border object-contain p-2", className)} />
        }
        return <iframe src={previewUrl} className={cn("w-full h-full rounded-md object-contain border p-2", className)} title="file-preview" />
    }

    // --- URLs ---
    if (isUrl) {
        const lowerUrl = previewUrl.toLowerCase()

        if (/\.(jpg|jpeg|png|gif|webp|svg)$/.test(lowerUrl)) {
            return <img src={previewUrl} alt="preview" className={cn("max-h-full border rounded-md object-contain", className)} />
        }
        if (/\.(mp3|wav|ogg)$/.test(lowerUrl)) {
            return <audio src={previewUrl} controls className={cn("w-full max-h-full border rounded-md object-contain", className)} />
        }
        if (/\.(mp4|webm|ogg)$/.test(lowerUrl)) {
            return <video src={previewUrl} controls className={cn("w-full max-h-full border rounded-md object-contain", className)} />
        }
        if (/\.(pdf|doc|docx|ppt|pptx|xls|xlsx)$/.test(lowerUrl)) {
            return <iframe src={previewUrl} className={cn("w-full h-full border rounded-md object-contain ", className)} title="doc-preview" />
        }

        // Manejar URLs de YouTube
        if (isYouTubeUrl(previewUrl)) {
            const embedUrl = getYouTubeEmbedUrl(previewUrl)
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

        // Manejar URLs de Vimeo (opcional)
        if (previewUrl.includes('vimeo.com')) {
            const vimeoId = previewUrl.split('/').pop()
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

        // fallback para otros links
        return (
            <iframe
                src={previewUrl}
                className={cn("w-full h-full", className)}
                title="url-preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
        )
    }

    return null
}