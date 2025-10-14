// lib/resource-service.ts
import { ResourceCreateDTO, ResourceDTO } from "@/interface/resource";
import { getBaseUrl } from "../utils";

const baseUrl = getBaseUrl();

export async function createResource(
  data: ResourceCreateDTO
): Promise<ResourceDTO> {
  try {
    const response = await fetch(`${baseUrl}/api/resource`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating resource");
    }

    return response.json();
  } catch (error) {
    console.error("Error in createResource:", error);
    throw error;
  }
}

export async function editResource(
  id: string,
  data: Partial<ResourceCreateDTO>
): Promise<ResourceDTO> {
  try {

    const response = await fetch('/api/resource', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating resource");
    }

    return response.json();
  } catch (error) {
    console.error("Error in editResource:", error);
    throw error;
  }
}

export async function deleteResource(
  id: string
): Promise<{ success: boolean }> {
  try {

    const response = await fetch(`/api/resource/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting resource");
    }

    return { success: true };
  } catch (error) {
    console.error("Error in deleteResource:", error);
    throw error;
  }
}

export async function getResources(
  page: number = 1,
  limit: number = 10
): Promise<ResourceDTO[]> {
  try {
    const response = await fetch(`/api/resource?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching resources");
    }

    return response.json();
  } catch (error) {
    console.error("Error in getResources:", error);
    throw error;
  }
}

export async function getResourceById(id: string): Promise<ResourceDTO> {
  try {
    const response = await fetch(`${baseUrl}/api/resource/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching resource");
    }

    return response.json();
  } catch (error) {
    console.error("Error in getResourceById:", error);
    throw error;
  }
}
