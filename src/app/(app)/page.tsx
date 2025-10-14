"use client";

import { useEffect, useState } from "react";
import { ResourceDTO } from "@/interface/resource";
import { getResources } from "@/lib/services/resource-service";
import { CommunityCard } from "@/components/community/community-card";
import { useRouter } from "next/navigation";
import { CommunityDTO } from "@/interface/community";
import { InfiniteFeed } from "@/components/feed/infinite-feed";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [initialPosts, setInitialPosts] = useState<ResourceDTO[]>([]);
  const [loading, setLoading] = useState(true);
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
      image:
        "https://images.unsplash.com/photo-1581091012184-5c7b3a5a73a3?w=500",
      avatar:
        "https://images.unsplash.com/photo-1581091012184-5c7b3a5a73a3?w=500",
    },
    {
      id: "1234567687",
      title: "DevOps World",
      description:
        "Un espacio para hablar de CI/CD, Docker, Kubernetes y todo lo relacionado con infraestructura moderna.",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500",
      avatar:
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500",
    },
  ];

  useEffect(() => {
    loadInitialPosts();
    setCommunities(mockCommunity);
  }, []);

  const loadInitialPosts = async () => {
    try {
      setLoading(true);
      const data = await getResources(1, 10);
      setInitialPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-6xl mx-auto pb-20 md:pb-6">
        {/* Feed principal */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg border overflow-hidden animate-pulse"
                >
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
          ) : (
            <InfiniteFeed initialPosts={initialPosts} />
          )}
        </div>

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
                    onClick={() => router.push(`/community/${com.id}`)}
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
    </div>
  );
}