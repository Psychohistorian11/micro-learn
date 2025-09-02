"use client";

import { useState } from "react";

export default function UserDescription({
  description,
}: {
  description?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const MAX_LENGTH = 80; // 🔹 cantidad de caracteres a mostrar por defecto

  const isLong = description.length > MAX_LENGTH;
  const text = expanded
    ? description
    : description.substring(0, MAX_LENGTH) + (isLong ? "..." : "");

  return (
    <div className="mt-3 text-gray-700 text-sm">
      <p>{text}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:underline mt-1"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}
