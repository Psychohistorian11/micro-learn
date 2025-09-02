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

