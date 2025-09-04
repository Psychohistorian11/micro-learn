import { AreaDTO } from "@/interface/area"

export async function fetchAreas(): Promise<AreaDTO[]> {
  try {
    const res = await fetch("/api/areas")
    if (!res.ok) throw new Error("Error fetching areas")

    return await res.json()
  } catch (err) {
    console.error("Error fetching areas:", err)
    return []
  }
}

export async function fetchAreasByIds(ids: string[]): Promise<AreaDTO[]> {
  try {
    const response = await fetch('/api/areas/by-ids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Error fetching areas by IDs');
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchAreasByIds:', error);
    throw error;
  }
}