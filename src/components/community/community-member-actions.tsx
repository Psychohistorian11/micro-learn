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
import { MoreHorizontal, UserMinus, Crown, Shield, User } from "lucide-react";
import { removeMemberFromCommunity } from "@/lib/services/community-service";
import { useCommunityRole } from "@/hooks/use-community-role";
import { Member } from "./community-members";
import { CommunityRole } from "@prisma/client";

interface CommunityMemberActionsProps {
  member: Member;
  communityId: string;
  onMemberRemoved?: (memberId: string) => void;
}

export function CommunityMemberActions({
  member,
  communityId,
  onMemberRemoved,
}: CommunityMemberActionsProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { canManageMembers, isAdmin } = useCommunityRole(communityId);

  const handleRemoveMember = async () => {
    try {
      setIsRemoving(true);
      await removeMemberFromCommunity(communityId, member.id);
      onMemberRemoved?.(member.id);
      setShowRemoveDialog(false);
    } catch (error) {
      console.error("Error removing member:", error);
      // TODO: Show error toast
    } finally {
      setIsRemoving(false);
    }
  };

  const getRoleIcon = (role: CommunityRole) => {
    switch (role) {
      case CommunityRole.Admin:
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case CommunityRole.Mod:
        return <Shield className="h-3 w-3 text-blue-500" />;
      default:
        return <User className="h-3 w-3 text-gray-500" />;
    }
  };

  const canRemoveMember =
    canManageMembers && member.role !== CommunityRole.Admin;

  if (!canRemoveMember) {
    return (
      <div className="flex items-center gap-1">
        {getRoleIcon(member.role)}
        <span className="text-xs text-muted-foreground capitalize">
          {member.role}
        </span>
      </div>
    );
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
          <DropdownMenuItem disabled>
            <Crown className="h-4 w-4 mr-2" />
            Cambiar rol
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowRemoveDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <UserMinus className="h-4 w-4 mr-2" />
            Expulsar de la comunidad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <UserMinus className="h-5 w-5 text-destructive" />
              Expulsar Miembro
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres expulsar a{" "}
              <strong>{member.username}</strong> de esta comunidad?
              <br />
              <br />
              Esta acción se puede revertir invitando al usuario nuevamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              disabled={isRemoving}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isRemoving ? "Expulsando..." : "Expulsar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
