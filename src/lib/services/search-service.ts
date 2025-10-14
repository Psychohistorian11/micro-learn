// lib/services/search-service.ts
import { ResourceDTO } from "@/interface/resource";
import { CommunityDTO } from "@/interface/community";
import { getBaseUrl } from "../utils";
const baseUrl = getBaseUrl();

// --- Mocks temporales ---
const mockResources: ResourceDTO[] = [
  {
    id: "r1",
    title: "Introducción a React",
    isPublic: true,
    image: "/images/resource1.png",
    description: "Un recurso para aprender los fundamentos de React.",
    attachment: "/docs/react.pdf",
    type: "ARTICLE" as any, // depende de tu enum ResourceType
    authorId: "user1",
    updatedAt: new Date(),
    createdAt: new Date(),
    areas: [],
    communities: [{ id: "c1" }],
  },
  {
    id: "r2",
    title: "Guía de Next.js",
    isPublic: true,
    image: "/images/resource2.png",
    description: "Tutorial paso a paso sobre Next.js.",
    attachment: "/docs/next.pdf",
    type: "VIDEO" as any,
    authorId: "user2",
    updatedAt: new Date(),
    createdAt: new Date(),
    areas: [],
    communities: [{ id: "c2" }],
  },
];

const mockCommunities: CommunityDTO[] = [
  {
    id: "c1",
    title: "Comunidad React",
    image: "/images/community1.png",
    avatar: "/images/avatar1.png",
    description: "Espacio para compartir recursos y dudas sobre React.",
    users: ["user1", "user2"],
    resources: ["r1"],
  },
  {
    id: "c2",
    title: "Comunidad Next.js",
    image: "/images/community2.png",
    avatar: "/images/avatar2.png",
    description: "Foro de aprendizaje y práctica con Next.js.",
    users: ["user3"],
    resources: ["r2"],
  },
];

export async function search(query: string, areas: string[]): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        area_ids: areas,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error searching community | resources"
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
}

// --- Funciones de búsqueda mock ---
export async function searchResources(query: string): Promise<ResourceDTO[]> {
  if (!query) return [];
  const q = query.toLowerCase();
  return new Promise(
    (resolve) =>
      setTimeout(() => {
        resolve(
          mockResources.filter(
            (r) =>
              r.title.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q)
          )
        );
      }, 300) // simula delay de red
  );
}

export async function searchCommunities(
  query: string
): Promise<CommunityDTO[]> {
  if (!query) return [];
  const q = query.toLowerCase();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        mockCommunities.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        )
      );
    }, 300)
  );
}
