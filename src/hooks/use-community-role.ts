"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CommunityRole } from "@prisma/client";
import { fetchUserCommunityRole } from "@/lib/services/community-service";

interface UseCommunityRoleReturn {
  userId: string | null;
  role: CommunityRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isParticipant: boolean;
  isNotMember: boolean;
  canManageSettings: boolean;
  canModerateContent: boolean;
  canManageMembers: boolean;
  error: string | null;
  refreshRole: () => Promise<void>;
}

export function useCommunityRole(communityId: string): UseCommunityRoleReturn {
  const { data: session } = useSession();
  const [role, setRole] = useState<CommunityRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRole = async () => {
    if (!session?.user?.id || !communityId) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchUserCommunityRole(
        communityId,
        session.user.id
      );
      setRole(response.role as CommunityRole);
    } catch (err) {
      console.error("Error fetching community role:", err);
      setError("Error al obtener el rol en la comunidad");
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [communityId, session?.user?.id]);

  const isAdmin = role == CommunityRole.Admin;
  const isModerator = role == CommunityRole.Mod;
  const isParticipant = role == CommunityRole.Member;
  const isNotMember = role === null;

  // Permission checks
  const canManageSettings = isAdmin;
  const canModerateContent = isAdmin || isModerator;
  const canManageMembers = isAdmin || isModerator;

  return {
    userId: session?.user?.id || null,
    role,
    isLoading,
    isAdmin,
    isModerator,
    isParticipant,
    isNotMember,
    canManageSettings,
    canModerateContent,
    canManageMembers,
    error,
    refreshRole: fetchRole,
  };
}
