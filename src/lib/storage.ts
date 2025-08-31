// lib/storage.ts
import { supabase } from "@/lib/supabaseClient";

export async function uploadFile(
  bucket: string,
  filePath: string,
  file: File
): Promise<string> {
  try {
    if (!file) throw new Error("No se ha seleccionado ningún archivo.");

    // Subir el archivo
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Error subiendo archivo:", uploadError.message);
      throw uploadError;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Error en uploadFile:", err);
    throw err;
  }
}
