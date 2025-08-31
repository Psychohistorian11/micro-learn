"use client";
import { useState } from "react";
import CreateResource from "./createResource";


type ResourceButtonProps = {
  userId: string;
};

export default function ResourceButton({ userId }: ResourceButtonProps) {
  const [showResource, setShowResource] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => setShowResource(!showResource)}
      >
        Crear recurso
      </button>

      {showResource && (
        <div className="w-full flex justify-center">
          <CreateResource userId={userId} />
        </div>
      )}
    </div>
  );
}
