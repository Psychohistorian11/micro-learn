// services/areasService.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export type Area = {
    id: number
    name: string
    color: string
    icon_key: string
}

export async function fetchAreas(): Promise<Area[]> {
    const { data, error } = await supabase.from("areas").select("*")

    if (error) {
        console.error("Error fetching areas:", error.message)
        return []
    }

    return data || []
}
