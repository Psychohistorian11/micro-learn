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

export async function createCommunity(data: Omit<CommunityDTO, 'id'>): Promise<CommunityDTO> {
    console.log("community data: ", data);
    try {
        const response = await fetch('/api/community', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating community');
        }

        return response.json();
    } catch (error) {
        console.error('Error in createCommunity:', error);
        throw error;
    }
}

export async function fetchCommunityById(communityId: string): Promise<CommunityDTO> {
    try {
        const response = await fetch(`/api/community/${communityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching community by ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchCommunityById:', error);
        throw error;
    }
}

export async function fetchCommunityPosts(communityId: string): Promise<any[]> {
    try {
        const response = await fetch(`/api/community/${communityId}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching community posts');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchCommunityPosts:', error);
        throw error;
    }
}

export async function fetchCommunityMembers(communityId: string): Promise<any[]> {
    try {
        const response = await fetch(`/api/community/${communityId}/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching community members');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchCommunityMembers:', error);
        throw error;
    }
}
