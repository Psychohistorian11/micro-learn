// lib/resource-service.ts
import { ResourceCreateDTO, ResourceDTO } from "@/interface/resource";

export async function createResource(data: ResourceCreateDTO): Promise<ResourceDTO> {
    try {
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