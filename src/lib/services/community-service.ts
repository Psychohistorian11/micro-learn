import {
  CommunityCreateDTO,
  CommunityDTO,
  CommunityUpdateDTO,
} from "@/interface/community";
import { getBaseUrl } from "../utils";
import { ResourceDTO } from "@/interface/resource";
import { UserResponseDTO } from "@/interface/user";
const baseUrl = getBaseUrl();
export async function fetchCommunitiesUserById(
  userId: string
): Promise<CommunityDTO[]> {
  try {
    const response = await fetch(`${baseUrl}/api/community/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching communities by user ID");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCommunitiesUserById:", error);
    throw error;
  }
}

export async function fetchCommunitiesByIds(
  ids: string[]
): Promise<CommunityDTO[]> {
  try {
    const response = await fetch(`${baseUrl}/api/community/by-ids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error("Error fetching communities by IDs");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCommunitiesByIds:", error);
    throw error;
  }
}

export async function createCommunity(
  data: CommunityCreateDTO
): Promise<CommunityDTO> {
  console.log("community data: ", data);
  try {
    const response = await fetch(`${baseUrl}/api/community`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating community");
    }

    return response.json();
  } catch (error) {
    console.error("Error in createCommunity:", error);
    throw error;
  }
}

export async function fetchCommunityById(
  communityId: string
): Promise<CommunityDTO> {
  try {
    console.log("communityId", communityId);
    const response = await fetch(`${baseUrl}/api/community/${communityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching community by ID");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCommunityById:", error);
    throw error;
  }
}

export async function fetchCommunityResources(
  communityId: string
): Promise<ResourceDTO[]> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/resources`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching community posts");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCommunityPosts:", error);
    throw error;
  }
}

export async function fetchCommunityMembers(
  communityId: string
): Promise<UserResponseDTO[]> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/members`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching community members");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCommunityMembers:", error);
    throw error;
  }
}

export async function fetchUserCommunityRole(
  communityId: string,
  userId: string
): Promise<{
  userId: string;
  communityId: string;
  role: string | null;
}> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/user/${userId}/role`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching user community role");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchUserCommunityRole:", error);
    throw error;
  }
}

export async function updateCommunity(
  data: CommunityUpdateDTO
): Promise<CommunityDTO> {
  try {
    const response = await fetch(`${baseUrl}/api/community/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating community");
    }

    return response.json();
  } catch (error) {
    console.error("Error in updateCommunity:", error);
    throw error;
  }
}

export async function deleteCommunity(communityId: string): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}/api/community/${communityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting community");
    }
  } catch (error) {
    console.error("Error in deleteCommunity:", error);
    throw error;
  }
}

export async function removeMemberFromCommunity(
  communityId: string,
  userId: string
): Promise<void> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/members/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error removing member from community"
      );
    }
  } catch (error) {
    console.error("Error in removeMemberFromCommunity:", error);
    throw error;
  }
}

export async function deleteCommunityPost(
  communityId: string,
  postId: string
): Promise<void> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting community post");
    }
  } catch (error) {
    console.error("Error in deleteCommunityPost:", error);
    throw error;
  }
}
