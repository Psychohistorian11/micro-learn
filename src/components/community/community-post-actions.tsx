"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash2, Flag, Shield, Download } from "lucide-react";
import { ResourceDTO } from "@/interface/resource";
import { deleteCommunityPost } from "@/lib/services/community-service";
import { useCommunityRole } from "@/hooks/use-community-role";

interface CommunityPostActionsProps {
  post: ResourceDTO;
  communityId: string;
  onPostDeleted?: (postId: string) => void;
}

export function CommunityPostActions({
  post,
  communityId,
  onPostDeleted,
}: CommunityPostActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { canModerateContent } = useCommunityRole(communityId);

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      await deleteCommunityPost(communityId, post.id);
      onPostDeleted?.(post.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      // TODO: Show error toast
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadResource = async () => {
    try {
      // Si no hay archivo adjunto, crear un archivo de texto con la información del recurso
      const resourceContent = `Título: ${post.title}\n\nDescripción: ${
        post.description
      }\n\nTipo: ${post.type}\n\nÁreas: ${
        post.areas?.map((area) => area.area.name).join(", ") || "N/A"
      }\n\nFecha de creación: ${new Date(post.createdAt).toLocaleString()}`;
      const blob = new Blob([resourceContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${post.title}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resource:", error);
      // TODO: Show error toast
    }
  };
  // En el feed, siempre mostrar las acciones (excepto eliminar que requiere permisos)
  const showActions = communityId === "feed" || canModerateContent;

  if (!showActions) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDownloadResource}>
            <Download className="h-4 w-4 mr-2" />
            Descargar info del recurso
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Flag className="h-4 w-4 mr-2" />
            Reportar
          </DropdownMenuItem>
          {canModerateContent && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar post
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-destructive" />
              Eliminar Post
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar este post? Esta acción no se
              puede deshacer.
              <br />
              <br />
              <strong>Título:</strong> {post.title}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
