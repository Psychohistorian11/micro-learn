import { Suspense } from "react";
import { CommunityPage } from "@/components/community/community-page";
import { CommunityDTO } from "@/interface/community";
import { ResourceDTO } from "@/interface/resource";

// Mock data for development
const mockCommunity: CommunityDTO = {
    id: "1234567689",
    title: "Pythonhunters",
    description: "Comunidad para auténticos lovers a Python. Aquí compartimos recursos, tutoriales, proyectos y nos ayudamos mutuamente en nuestro viaje de aprendizaje con Python. Desde principiantes hasta expertos, todos son bienvenidos.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
};

const mockPosts: ResourceDTO[] = [
    {
        id: "1",
        title: "Guía completa de Python para principiantes",
        description: "Una guía paso a paso para empezar con Python desde cero. Incluye conceptos básicos, sintaxis, y ejemplos prácticos.",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500",
        attachment: "https://example.com/python-guide.pdf",
        type: "Text",
        isPublic: true,
        authorId: "user1",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        areas: [{ area: { id: "area1", name: "Programación", color: "#3B82F6", icon: "code" } }],
        communities: [{ id: "1234567689" }]
    },
    {
        id: "2",
        title: "Tutorial: Creando tu primera API con FastAPI",
        description: "Aprende a crear APIs REST modernas y rápidas con FastAPI. Incluye autenticación, validación de datos y documentación automática.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
        attachment: "https://example.com/fastapi-tutorial.mp4",
        type: "Video",
        isPublic: true,
        authorId: "user2",
        createdAt: new Date("2024-01-14"),
        updatedAt: new Date("2024-01-14"),
        areas: [{ area: { id: "area2", name: "Web Development", color: "#10B981", icon: "globe" } }],
        communities: [{ id: "1234567689" }]
    },
    {
        id: "3",
        title: "Data Science con Pandas y NumPy",
        description: "Explora el mundo del análisis de datos con las librerías más populares de Python. Incluye ejemplos con datasets reales.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        attachment: "https://example.com/datascience-notebook.ipynb",
        type: "Text",
        isPublic: true,
        authorId: "user3",
        createdAt: new Date("2024-01-13"),
        updatedAt: new Date("2024-01-13"),
        areas: [{ area: { id: "area3", name: "Data Science", color: "#8B5CF6", icon: "chart" } }],
        communities: [{ id: "1234567689" }]
    }
];

const mockMembers = [
    {
        id: "user1",
        name: "Ana García",
        username: "ana_python",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
        role: "admin",
        joinedAt: "2023-01-15",
        isOnline: true
    },
    {
        id: "user2",
        name: "Carlos López",
        username: "carlos_dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        role: "moderator",
        joinedAt: "2023-02-20",
        isOnline: false
    },
    {
        id: "user3",
        name: "María Rodríguez",
        username: "maria_data",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        role: "member",
        joinedAt: "2023-03-10",
        isOnline: true
    },
    {
        id: "user4",
        name: "David Chen",
        username: "david_ml",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        role: "member",
        joinedAt: "2023-04-05",
        isOnline: false
    },
    {
        id: "user5",
        name: "Laura Martínez",
        username: "laura_ai",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        role: "member",
        joinedAt: "2023-05-12",
        isOnline: true
    }
];

async function CommunityContent({ communityId }: { communityId: string }) {
    // TODO: Replace with actual API calls
    // const community = await fetchCommunityById(communityId);
    // const posts = await fetchCommunityPosts(communityId);
    // const members = await fetchCommunityMembers(communityId);

    return (
        <CommunityPage
            community={mockCommunity}
            posts={mockPosts}
            members={mockMembers}
            loading={false}
        />
    );
}

export default async function CommunityPageRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-green mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando comunidad...</p>
                </div>
            </div>
        }>
            <CommunityContent communityId={id} />
        </Suspense>
    );
}