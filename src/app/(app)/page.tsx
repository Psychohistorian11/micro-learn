"use client";

import { useEffect, useState } from "react";
import { CommunityPosts } from "@/components/community/community-posts";
import { ResourceDTO } from "@/interface/resource";
import { Button } from "@/components/ui/button";
import { getResources } from "@/lib/services/resource-service";
import { CommunityCard } from "@/components/community/community-card";
import { useRouter } from "next/navigation";
import { CommunityDTO } from "@/interface/community";

export default function HomePage() {
    const [posts, setPosts] = useState<ResourceDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const router = useRouter();
    const [communities, setCommunities] = useState<CommunityDTO[]>([]);

    const mockCommunity: CommunityDTO[] = [
        {
            id: "1234567689",
            title: "Pythonhunters",
            description:
                "Comunidad para auténticos lovers a Python. Aquí compartimos recursos, tutoriales, proyectos y nos ayudamos mutuamente.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
            avatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
        },
        {
            id: "1234567688",
            title: "Frontend Masters",
            description:
                "Todo sobre React, Vue, Angular y frameworks modernos. Comparte tu experiencia y mejora tus skills.",
            image: "https://images.unsplash.com/photo-1581091012184-5c7b3a5a73a3?w=500",
            avatar: "https://images.unsplash.com/photo-1581091012184-5c7b3a5a73a3?w=500",
        },
        {
            id: "1234567687",
            title: "DevOps World",
            description:
                "Un espacio para hablar de CI/CD, Docker, Kubernetes y todo lo relacionado con infraestructura moderna.",
            image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500",
            avatar: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500",
        },
    ];

    useEffect(() => {
        loadPosts();
    }, [page]);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await getResources(page, 5);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prev) => [...prev, ...data]);
                setCommunities(mockCommunity);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-6xl mx-auto pb-20 md:pb-6">
            {/* Feed principal */}
            <div className="flex-1 min-w-0">
                {loading && posts.length === 0 ? (
                    <CommunityPosts posts={[]} loading={true} communityId="home" />
                ) : (
                    <CommunityPosts posts={posts} communityId="home" />
                )}

                {/* Botón de cargar más */}
                {hasMore && !loading && (
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-6 py-2 text-base font-medium rounded-full shadow-sm"
                        >
                            Cargar más
                        </Button>
                    </div>
                )}
            </div>

            {/* Sidebar derecho */}
            <aside className="hidden md:block w-72 shrink-0">
                <div className="border shadow-sm p-5 sticky top-4">
                    <h3 className="font-semibold text-lg mb-4">
                        Comunidades populares
                    </h3>
                    <div className="space-y-3">
                        {communities.length > 0 ? (
                            communities.map((com) => (
                                <CommunityCard
                                    key={com.id}
                                    community={com}
                                    onClick={() =>
                                        router.push(`/community/${com.id}`)
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Sin resultados
                            </p>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
}