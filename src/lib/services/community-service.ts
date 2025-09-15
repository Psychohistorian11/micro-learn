import { CommunityDTO } from "@/interface/community";

export async function fetchCommunitiesUserById(userId: string): Promise<CommunityDTO[]> {
    try {
        const response = await fetch(`/api/community/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching communities by user ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchCommunitiesUserById:', error);
        throw error;
    }
}

export async function fetchCommunitiesByIds(ids: string[]): Promise<CommunityDTO[]> {
    try {
        const response = await fetch('/api/community/by-ids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            throw new Error('Error fetching communities by IDs');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchCommunitiesByIds:', error);
        throw error;
    }
}