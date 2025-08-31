import { uploadFile } from "@/lib/storage";

export async function uploadAttachment(userId: string, file: File) {
  try {
    if (!file) throw new Error("No se ha seleccionado ningún archivo.");

    const uuid = crypto.randomUUID();
    const filePath = `${userId}/${uuid}`;

    const publicUrl = await uploadFile("resources", filePath, file);

    return publicUrl;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
