import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Cliente → usa relativa
    return "";
  }
  // Servidor → usa absoluta desde env
  return process.env.NEXTAUTH_URL ?? "http://localhost:3000";
}
