"use client";

import { useState, useEffect, useCallback } from "react";
import { ResourceDTO } from "@/interface/resource";
import { FeedCard } from "./feed-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getResources } from "@/lib/services/resource-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { RefreshCw, AlertCircle } from "lucide-react";

interface InfiniteFeedProps {
    initialPosts?: ResourceDTO[];
    onPostDeleted?: (postId: string) => void;
}

export function InfiniteFeed({ initialPosts = [], onPostDeleted }: InfiniteFeedProps) {
    const [posts, setPosts] = useState<ResourceDTO[]>(initialPosts);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            setError(null);
            const newPosts = await getResources(page + 1, 10);
            
            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
                setPage(prev => prev + 1);
            }
        } catch (err) {
            console.error("Error loading posts:", err);
            setError("Error al cargar más publicaciones");
        } finally {
            setIsLoading(false);
        }
    }, [page, isLoading, hasMore]);

    const { targetRef } = useInfiniteScroll(loadMore, {
        hasMore,
        isLoading,
        threshold: 0.1,
        rootMargin: '100px'
    });

    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setPage(1);
            setHasMore(true);
            const newPosts = await getResources(1, 10);
            setPosts(newPosts);
        } catch (err) {
            console.error("Error refreshing posts:", err);
            setError("Error al actualizar las publicaciones");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostDeleted = (postId: string) => {
        setPosts(prev => prev.filter(post => post.id !== postId));
        onPostDeleted?.(postId);
    };

    if (error && posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Error al cargar publicaciones</h3>
                <p className="text-muted-foreground text-center mb-4">{error}</p>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Intentar de nuevo
                </Button>
            </div>
        );
    }

    if (posts.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold mb-2">No hay publicaciones aún</h3>
                <p className="text-muted-foreground text-center mb-4">
                    Sé el primero en compartir un recurso o únete a una comunidad
                </p>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Posts */}
            {posts.map((post) => (
                <FeedCard
                    key={post.id}
                    post={post}
                    onPostDeleted={handlePostDeleted}
                />
            ))}

            {/* Loading States */}
            {isLoading && (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-card rounded-xl border shadow-sm p-4">
                            <div className="flex gap-3 mb-4">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-3 w-1/6" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-3/4 mb-3" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <Skeleton className="h-48 w-full rounded-lg mb-4" />
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More Trigger */}
            {hasMore && !isLoading && (
                <div ref={targetRef} className="flex justify-center py-4">
                    <div className="text-sm text-muted-foreground">
                        Desplázate para cargar más...
                    </div>
                </div>
            )}

            {/* End of Feed */}
            {!hasMore && posts.length > 0 && (
                <div className="flex justify-center py-8">
                    <div className="text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-muted-foreground">
                            ¡Has visto todas las publicaciones!
                        </p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && posts.length > 0 && (
                <div className="flex justify-center py-4">
                    <Button onClick={handleRefresh} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Cargar más
                    </Button>
                </div>
            )}
        </div>
    );
}
