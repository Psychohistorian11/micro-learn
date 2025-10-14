"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export type CommunityRole = "admin" | "moderator" | "participant" | null;

interface UseCommunityRoleReturn {
  role: CommunityRole;
  isLoading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isParticipant: boolean;
  isNotMember: boolean;
  canManageSettings: boolean;
  canModerateContent: boolean;
  canManageMembers: boolean;
  error: string | null;
}

export function useCommunityRole(communityId: string): UseCommunityRoleReturn {
  const { data: session } = useSession();
  const [role, setRole] = useState<CommunityRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!session?.user?.id || !communityId) {
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call - replace with actual implementation
        // const response = await fetchUserCommunityRole(communityId, session.user.id);
        // setRole(response.role as CommunityRole);

        // Mock response for development
        const mockRole = "admin" as CommunityRole; // Change this to test different roles
        setRole(mockRole);
      } catch (err) {
        console.error("Error fetching community role:", err);
        setError("Error al obtener el rol en la comunidad");
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [communityId, session?.user?.id]);

  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  const isParticipant = role === "participant";
  const isNotMember = role === null;

  // Permission checks
  const canManageSettings = isAdmin;
  const canModerateContent = isAdmin || isModerator;
  const canManageMembers = isAdmin || isModerator;

  return {
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
  };
}
