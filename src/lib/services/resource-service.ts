// lib/resource-service.ts
import { ResourceCreateDTO, ResourceDTO } from "@/interface/resource";

export async function createResource(data: ResourceCreateDTO): Promise<ResourceDTO> {
    try {
        console.log("Creating resource with data:", JSON.stringify(data));

        const response = await fetch('/api/resource', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating resource');
        }

        return response.json();
    } catch (error) {
        console.error('Error in createResource:', error);
        throw error;
    }
}

export async function editResource(id: string, data: Partial<ResourceCreateDTO>): Promise<ResourceDTO> {
    try {
        console.log("Updating resource:", id, "with data:", JSON.stringify(data));

        const response = await fetch('/api/resource', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...data }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating resource');
        }

        return response.json();
    } catch (error) {
        console.error('Error in editResource:', error);
        throw error;
    }
}

export async function deleteResource(id: string): Promise<{ success: boolean }> {
    try {
        console.log("Deleting resource:", id);

        const response = await fetch(`/api/resource/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting resource');
        }

        return { success: true };
    } catch (error) {
        console.error('Error in deleteResource:', error);
        throw error;
    }
}