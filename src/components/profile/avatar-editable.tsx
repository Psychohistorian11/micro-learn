"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserUpdateDTO } from "@/interface/user";
import { uploadFile } from "@/lib/storage";
import { useRef, useState } from "react";

export function AvatarEditable({ user }: { user?: any }) {
  const [serverError, setServerError] = useState("");
  const [preview, setPreview] = useState<string | null>(null); // 👈 solo preview temporal
  const [current, setCurrent] = useState<string | null>(
    user?.profilePicture ?? null
  ); // 👈 el confirmado
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setOpen(true); // abre el diálogo de confirmación
    }
  }

  async function handleConfirm() {
    try {
      const url = await uploadFile(
        "users",
        user?.id,
        fileInputRef.current?.files?.[0]!
      );
      const dataToSend: UserUpdateDTO = {
        id: user?.id,
        profilePicture: url,
      };

      const response = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const bustUrl = `${url}?t=${Date.now()}`;
        setCurrent(bustUrl);
        setOpen(false);
      } else {
        const error = await response.json();
        setServerError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setServerError("Failed to connect to the server.");
    }
  }

  function handleCancel() {
    setPreview(null);
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative cursor-pointer group w-full sm:w-auto justify-center flex"
        onClick={() => fileInputRef.current?.click()}
      >
        <Avatar className="w-full sm:w-auto h-auto sm:h-30  rounded-lg">
          <AvatarImage src={current ?? undefined} alt={user?.name ?? "User"} />
          <AvatarFallback className="w-full sm:w-auto h-full rounded-lg">
            {user?.username?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div
          className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm 
             opacity-0 group-hover:opacity-100 
             flex items-center justify-center 
             text-white text-sm font-medium transition"
        >
          Cambiar
        </div>
      </div>

      <input
        ref={fileInputRef}
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>¿Quieres usar esta foto?</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center py-4">
            {preview && (
              <Avatar className="h-28 w-28 rounded-lg">
                <AvatarImage src={preview} alt="Preview" />
              </Avatar>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {serverError && (
        <p className="text-tiffany-blue text-xs text-center mt-2">
          {serverError}
        </p>
      )}
    </div>
  );
}
