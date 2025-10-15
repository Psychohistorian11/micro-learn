import {
  CommunityCreateDTO,
  CommunityDTO,
  CommunityUpdateDTO,
} from "@/interface/community";
import { getBaseUrl } from "../utils";
import { ResourceDTO } from "@/interface/resource";
import { UserResponseDTO } from "@/interface/user";
import { PostDTO } from "@/interface/post";
import { CommunityRole } from "@prisma/client";
import { Member } from "@/components/community/community-members";
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
): Promise<PostDTO[]> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/resources/post`,
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
): Promise<Member[]> {
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
      `${baseUrl}/api/community/${communityId}/members/${userId}`,
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
    return response.json();
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
    return response.json();
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
    return response.json();
  } catch (error) {
    console.error("Error in deleteCommunityPost:", error);
    throw error;
  }
}

export async function joinCommunity(
  communityId: string,
  userId: string,
  role: CommunityRole = "Member"
): Promise<void> {
  try {
    const response = await fetch(
      `${baseUrl}/api/community/${communityId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting community post");
    }
    return response.json();
  } catch (error) {
    console.error("Error in joinCommunity:", error);
    throw error;
  }
}

export async function fetchJoinRequests(communityId: string): Promise<
  { id: string; createdAt: string; user: UserResponseDTO }[]
> {
  const response = await fetch(`${baseUrl}/api/community/${communityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "list" }),
  });
  if (!response.ok) {
    throw new Error("Error fetching join requests");
  }
  return response.json();
}

export async function approveJoinRequest(
  communityId: string,
  requestId: string
): Promise<void> {
  const response = await fetch(`${baseUrl}/api/community/${communityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "approve", requestId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error approving request");
  }
}

export async function rejectJoinRequest(
  communityId: string,
  requestId: string
): Promise<void> {
  const response = await fetch(`${baseUrl}/api/community/${communityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reject", requestId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error rejecting request");
  }
}