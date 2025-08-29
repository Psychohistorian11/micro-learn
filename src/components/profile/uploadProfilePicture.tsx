import { supabase } from "../../lib/supabaseClient"

export async function uploadProfilePicture(userId: string, file: File) {
  let fileName = `${userId}-${Date.now()}-${file.name}`

  let { error } = await supabase.storage
    .from("users") 
    .upload(fileName, file, { upsert: true })

  if (error) {
    console.error("Error subiendo imagen:", error)
    return null
  }

  let { data } = supabase.storage.from("users").getPublicUrl(fileName)

  let publicUrl = data.publicUrl

  let { error: dbError } = await supabase
    .from("users")
    .update({ profilePicture: publicUrl })
    .eq("id", userId)

  if (dbError) {
    console.error("Error:", dbError)
    return null
  }

  return publicUrl
}
