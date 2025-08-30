import { supabase } from "@/lib/supabaseClient"; 

export async function uploadResource(userId: string, resourceType: string, file: File) {
  try {
    if (!file) throw new Error("No se ha seleccionado ningún archivo.");

    const filePath = `resources/${resourceType}/${userId}/${file.name}`;

    // Subir el archivo
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resources")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error subiendo archivo:", uploadError.message);
      throw uploadError;
    }

    const { data: urlData} = supabase.storage
      .from("resources")
      .getPublicUrl(filePath);


    return urlData.publicUrl;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
