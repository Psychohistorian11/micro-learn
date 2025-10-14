"use client";

import { useEffect, useState } from "react";
import { ResourceDTO } from "@/interface/resource";
import { getResources } from "@/lib/services/resource-service";
import { CommunityCard } from "@/components/community/community-card";
import { useRouter } from "next/navigation";
import { CommunityDTO } from "@/interface/community";
import { InfiniteFeed } from "@/components/feed/infinite-feed";
import { TrendingUp } from "lucide-react";

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
      <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-6xl mx-auto">
        {/* Feed principal */}
        <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border shadow-sm p-6"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-1/6 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-6 bg-muted rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 mb-4 animate-pulse" />
                  <div className="h-48 bg-muted rounded-lg mb-4 animate-pulse" />
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                      <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                      <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <InfiniteFeed initialPosts={initialPosts} />
          )}
        </div>

        <aside className="lg:w-80 shrink-0">
          <div className="sticky space-y-6">
            <div className="bg-card rounded-xl border shadow-sm p-5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-persian-green" />
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

            <div className="bg-card rounded-xl border shadow-sm p-5">
              <h3 className="font-semibold text-lg mb-4">Tendencias</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">#Python</span>
                  <span className="text-xs text-muted-foreground">+245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#React</span>
                  <span className="text-xs text-muted-foreground">+189</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#MachineLearning</span>
                  <span className="text-xs text-muted-foreground">+156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#DevOps</span>
                  <span className="text-xs text-muted-foreground">+134</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}