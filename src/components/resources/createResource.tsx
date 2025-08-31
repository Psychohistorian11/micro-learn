"use client";
import { useState } from "react";
import { uploadAttachment } from "./uploadAttachment";

type CreateResourceProps = {
  userId: string;
};

export default function CreateResource({ userId }: CreateResourceProps) {
  const [resourceType, setResourceType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!resourceType || !file) {
      alert("Selecciona un tipo de recurso y un archivo.");
      return;
    }
    await uploadAttachment(userId, file);
    alert("Recurso subido correctamente!");
    setFile(null);
    setResourceType("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md space-y-4 w-80 mx-auto">
      <select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700"
      >
        <option value="">Selecciona el tipo de recurso</option>
        <option value="document">Documento</option>
        <option value="image">Imagen</option>
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-500 file:text-white
                   hover:file:bg-blue-600
                   cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300"
      >Subir Recurso
      </button>
    </div>
  );
}
