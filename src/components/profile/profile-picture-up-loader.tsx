"use client";
import { useState } from "react";
import { uploadProfilePicture } from "./upload-profile-picture";

type ProfilePictureUploaderProps = {
  userId: string;
};

export default function ProfilePictureUploader({ userId }: ProfilePictureUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    await uploadProfilePicture(userId, file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md space-y-4 w-80 mx-auto">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-persian-green file:text-white
                   hover:file:bg-night-100
                   cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-persian-green -500 hover:bg-night-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300"
      >Subir</button>
    </div>
  );
}







