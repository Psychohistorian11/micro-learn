import { Suspense } from "react";
import { ResourceDTO } from "@/interface/resource";
import { getResourceById } from "@/lib/services/resource-service";
import { Skeleton } from "@/components/ui/skeleton";
import { ResourceDetailPage } from "@/components/resource/resource-detail-page";

// Mock data for development
const mockResource: ResourceDTO = {
  id: "1",
  title: "Guía completa de Python para principiantes",
  description:
    "Una guía paso a paso para empezar con Python desde cero. Incluye conceptos básicos, sintaxis, y ejemplos prácticos. Perfecta para aquellos que quieren adentrarse en el mundo de la programación con Python.",
  image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
  attachment: "https://example.com/python-guide.pdf",
  type: "Text",
  isPublic: true,
  authorId: "user1",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
  areas: [
    {
      area: {
        id: "area1",
        name: "Programación",
        color: "#3B82F6",
        icon: "code",
      },
    },
  ],
  communities: [{ id: "1234567689" }],
};

async function ResourceContent({ resourceId }: { resourceId: string }) {
  // TODO: Replace with actual API call
  const resource = await getResourceById(resourceId);
  return <ResourceDetailPage resource={resource} loading={false} />;
}

export default async function ResourceDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-6">
              {/* Resource Header */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Resource Image */}  
              <Skeleton className="h-96 w-full rounded-lg" />

              {/* Resource Content */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ResourceContent resourceId={id} />
    </Suspense>
  );
}
