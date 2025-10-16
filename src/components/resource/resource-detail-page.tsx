"use client";

import { ResourceDTO } from "@/interface/resource";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Share2,
    Bookmark,
    Heart,
    MessageCircle,
    Download,
    ExternalLink,
    Play,
    FileText,
    Image as ImageIcon,
    Calendar,
    User,
    Tag
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ResourceDetailPageProps {
    resource: ResourceDTO;
    loading?: boolean;
}

export function ResourceDetailPage({ resource, loading = false }: ResourceDetailPageProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 1000));
    const [commentsCount, setCommentsCount] = useState(Math.floor(Math.random() * 50));
    const router = useRouter();
    //const { user } = useAuth();

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: resource.title,
                text: resource.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // TODO: Show toast notification
        }
    };

    const handleDownload = () => {
        if (resource.attachment) {
            window.open(resource.attachment, '_blank');
        }
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case "Video":
                return <Play className="h-5 w-5" />;
            case "Text":
                return <FileText className="h-5 w-5" />;
            case "Slides":
                return <ImageIcon className="h-5 w-5" />;
            case "Infography":
                return <ImageIcon className="h-5 w-5" />;
            case "Podcast":
                return <Play className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    const getResourceTypeColor = (type: string) => {
        switch (type) {
            case "Video":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            case "Text":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "Slides":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "Infography":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
            case "Podcast":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-muted rounded w-full animate-pulse" />
                            <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                        </div>
                        <div className="h-96 bg-muted rounded-lg animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-4 bg-muted rounded w-full animate-pulse" />
                            <div className="h-4 bg-muted rounded w-full animate-pulse" />
                            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back()}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Volver
                            </Button>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/default-avatar.png" alt="User" />
                                    <AvatarFallback className="text-sm font-medium">
                                        {resource.authorId.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">u/{resource.authorId}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(resource.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
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
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLike}
                                className={`${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                            >
                                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="ml-1">{likesCount}</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleBookmark}>
                                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleShare}>
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {/* Resource Header */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold font-serif leading-tight">
                            {resource.title}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {resource.description}
                        </p>

                        {/* Resource Meta */}
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>u/{resource.authorId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                <span>{resource.type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Resource Image/Preview */}
                    {(resource.image || resource.attachment) && (
                        <div className="relative">
                            {resource.image ? (
                                <div className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={resource.image}
                                        alt={resource.title}
                                        className="w-full h-auto max-h-[600px] object-cover"
                                    />
                                    {resource.attachment && (
                                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <Button
                                                onClick={handleDownload}
                                                className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-black"
                                                size="lg"
                                            >
                                                {getResourceIcon(resource.type)}
                                                <span className="ml-2">Ver recurso</span>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : resource.attachment ? (
                                <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-12 text-center hover:border-persian-green/50 transition-colors">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-4 rounded-full bg-persian-green/10">
                                            {getResourceIcon(resource.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Recurso disponible</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Haz clic en el botón para acceder al contenido
                                            </p>
                                            <Button
                                                onClick={handleDownload}
                                                className="bg-persian-green hover:bg-persian-green/90"
                                                size="lg"
                                            >
                                                {getResourceIcon(resource.type)}
                                                <span className="ml-2">Ver recurso</span>
                                                <ExternalLink className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                        <Badge className={getResourceTypeColor(resource.type)}>
                                            {resource.type}
                                        </Badge>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Tags */}
                    {resource.areas && resource.areas.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {resource.areas.map((areaWrapper, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                    {areaWrapper.area.name}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={handleLike}
                                className={`flex items-center gap-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                            >
                                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="font-medium">{likesCount}</span>
                            </Button>

                            <Button variant="ghost" className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                <span className="font-medium">{commentsCount} comentarios</span>
                            </Button>

                            <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2">
                                <Share2 className="h-5 w-5" />
                                <span className="font-medium">Compartir</span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                onClick={handleBookmark}
                                className={`${isBookmarked ? 'text-persian-green' : ''}`}
                            >
                                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                            </Button>
                            {resource.attachment && (
                                <Button variant="ghost" onClick={handleDownload}>
                                    <Download className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4">Comentarios</h3>
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Los comentarios estarán disponibles próximamente</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
