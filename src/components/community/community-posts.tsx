"use client";

import { ResourceDTO } from "@/interface/resource";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    IconMessageCircle,
    IconShare,
    IconBookmark,
    IconArrowUp,
    IconArrowDown,
    IconPlayerPlay,
    IconFileText,
    IconPhoto
} from "@tabler/icons-react";
import { useState } from "react";
import ResourcePreviewSheet from "../resource/create-resource/resource-preview-sheet";
import { CommunityPostActions } from "./community-post-actions";

interface CommunityPostsProps {
    posts: ResourceDTO[];
    loading?: boolean;
    communityId: string;
    onPostDeleted?: (postId: string) => void;
}

export function CommunityPosts({ posts, loading = false, communityId, onPostDeleted }: CommunityPostsProps) {
    const [previewPost, setPreviewPost] = useState<ResourceDTO | null>(null);

    const handlePreview = (post: ResourceDTO) => {
        setPreviewPost(post);
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case "Video":
                return <IconPlayerPlay className="h-4 w-4" />;
            case "Text":
                return <IconFileText className="h-4 w-4" />;
            case "Slides":
                return <IconPhoto className="h-4 w-4" />;
            case "Infography":
                return <IconPhoto className="h-4 w-4" />;
            case "Podcast":
                return <IconPlayerPlay className="h-4 w-4" />;
            default:
                return <IconFileText className="h-4 w-4" />;
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
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-lg border overflow-hidden animate-pulse">
                        {/* Header skeleton */}
                        <div className="p-3 md:p-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-2 w-16" />
                                    </div>
                                </div>
                                <Skeleton className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Content skeleton */}
                        <div className="p-3 md:p-4">
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <div className="space-y-2 mb-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            {/* Image skeleton */}
                            <div className="mb-4">
                                <Skeleton className="w-full h-40 md:h-48" />
                            </div>

                            {/* Tags skeleton */}
                            <div className="flex gap-1 md:gap-2 mb-4">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-12 rounded-full" />
                            </div>

                            {/* Actions skeleton */}
                            <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-2 md:gap-4">
                                    <div className="flex items-center gap-1">
                                        <Skeleton className="w-8 h-8" />
                                        <Skeleton className="w-4 h-4" />
                                        <Skeleton className="w-8 h-8" />
                                    </div>
                                    <Skeleton className="w-16 h-8 hidden sm:block" />
                                    <Skeleton className="w-16 h-8 hidden sm:block" />
                                    <Skeleton className="w-8 h-8 sm:hidden" />
                                    <Skeleton className="w-8 h-8 sm:hidden" />
                                </div>
                                <Skeleton className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="bg-card rounded-lg border p-8 text-center">
                <div className="text-muted-foreground mb-2">
                    <IconFileText className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No hay publicaciones aún</h3>
                    <p className="text-sm">Sé el primero en compartir un recurso en esta comunidad</p>
                </div>
                <Button className="mt-4 bg-persian-green hover:bg-persian-green/90">
                    Crear primera publicación
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-card rounded-lg border hover:shadow-md transition-shadow overflow-hidden">
                    {/* Post Header */}
                    <div className="p-3 md:p-4 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/default-avatar.png" alt="User" />
                                    <AvatarFallback className="text-xs">
                                        {post.authorId.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">u/{post.authorId}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <CommunityPostActions
                                post={post}
                                communityId={communityId}
                                onPostDeleted={onPostDeleted}
                            />
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-3 md:p-4">
                        <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.description}
                        </p>

                        {/* Resource Preview */}
                        {(post.image || post.attachment) && (
                            <div className="mb-4">
                                <div className="relative group cursor-pointer" onClick={() => handlePreview(post)}>
                                    {post.image ? (
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                <IconPlayerPlay className="h-6 w-6 md:h-8 md:w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>
                                    ) : post.attachment ? (
                                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 md:p-8 text-center group-hover:border-persian-green/50 transition-colors">
                                            <div className="flex flex-col items-center gap-2">
                                                {getResourceIcon(post.type)}
                                                <span className="text-xs md:text-sm font-medium">Ver recurso</span>
                                                <Badge className={getResourceTypeColor(post.type)}>
                                                    {post.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {post.areas && post.areas.length > 0 && (
                            <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                                {post.areas.slice(0, 2).map((areaWrapper, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                        {areaWrapper.area.name}
                                    </Badge>
                                ))}
                                {post.areas.length > 2 && (
                                    <Badge variant="outline" className="text-xs px-2 py-1">
                                        +{post.areas.length - 2} más
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" className="h-8 px-1 md:px-2">
                                        <IconArrowUp className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium px-1">0</span>
                                    <Button variant="ghost" size="sm" className="h-8 px-1 md:px-2">
                                        <IconArrowDown className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Button variant="ghost" size="sm" className="h-8 px-1 md:px-2 hidden sm:flex">
                                    <IconMessageCircle className="h-4 w-4 mr-1" />
                                    <span className="text-sm">0 comentarios</span>
                                </Button>

                                <Button variant="ghost" size="sm" className="h-8 px-1 md:px-2 hidden sm:flex">
                                    <IconShare className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Compartir</span>
                                </Button>

                                {/* Botones móviles simplificados */}
                                <Button variant="ghost" size="sm" className="h-8 px-1 sm:hidden">
                                    <IconMessageCircle className="h-4 w-4" />
                                </Button>

                                <Button variant="ghost" size="sm" className="h-8 px-1 sm:hidden">
                                    <IconShare className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button variant="ghost" size="sm" className="h-8 px-1 md:px-2 shrink-0">
                                <IconBookmark className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Resource Preview Sheet */}
            {previewPost && (
                <ResourcePreviewSheet
                    open={!!previewPost}
                    onClose={() => setPreviewPost(null)}
                    attachment={previewPost.attachment}
                    title={previewPost.title}
                    description={previewPost.description}
                />
            )}
        </div>
    );
}
