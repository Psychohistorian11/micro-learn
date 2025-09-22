"use client";

import { ResourceDTO } from "@/interface/resource";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    MessageCircle,
    Share2,
    Bookmark,
    MoreHorizontal,
    ArrowUp,
    ArrowDown,
    Play,
    FileText,
    Image as ImageIcon
} from "lucide-react";
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
                return <Play className="h-4 w-4" />;
            case "Text":
                return <FileText className="h-4 w-4" />;
            case "Slides":
                return <ImageIcon className="h-4 w-4" />;
            case "Infography":
                return <ImageIcon className="h-4 w-4" />;
            case "Podcast":
                return <Play className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
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
                    <div key={i} className="bg-card rounded-lg border p-4 animate-pulse">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-muted rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-1/4" />
                                <div className="h-6 bg-muted rounded w-3/4" />
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-2/3" />
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
                    <FileText className="h-12 w-12 mx-auto mb-4" />
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
                <div key={post.id} className="bg-card rounded-lg border hover:shadow-md transition-shadow">
                    {/* Post Header */}
                    <div className="p-4 border-b">
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
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
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
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>
                                    ) : post.attachment ? (
                                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center group-hover:border-persian-green/50 transition-colors">
                                            <div className="flex flex-col items-center gap-2">
                                                {getResourceIcon(post.type)}
                                                <span className="text-sm font-medium">Ver recurso</span>
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
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.areas.slice(0, 3).map((areaWrapper, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {areaWrapper.area.name}
                                    </Badge>
                                ))}
                                {post.areas.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{post.areas.length - 3} más
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" className="h-8 px-2">
                                        <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium px-1">0</span>
                                    <Button variant="ghost" size="sm" className="h-8 px-2">
                                        <ArrowDown className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    <span className="text-sm">0 comentarios</span>
                                </Button>

                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <Share2 className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Compartir</span>
                                </Button>
                            </div>

                            <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Bookmark className="h-4 w-4" />
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
