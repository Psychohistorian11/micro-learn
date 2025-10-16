"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconPlus } from "@tabler/icons-react";
import { CommunityDTO } from "@/interface/community";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateCommunityDialog } from "./create-community/create-community-dialog";
import { fetchCommunitiesUserById } from "@/lib/services/community-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

export function CommunitiesSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [communities, setCommunities] = useState<CommunityDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommunities = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userCommunities = await fetchCommunitiesUserById(session.user.id);
        setCommunities(userCommunities);
      } catch (error) {
        console.error("Error loading communities:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCommunities();
  }, [session?.user?.id]);

  const handleCommunityClick = (communityId: string) => {
    router.push(`/community/${communityId}`);
  };

  const handleCommunityCreated = (newCommunity: CommunityDTO) => {
    setCommunities((prev) => [...prev, newCommunity]);
  };

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div>
      {/* Desktop Version - Exactamente igual */}
      <div className="hidden md:block">
        <SidebarMenu>
          {loading
            ? // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton className="w-full justify-start">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-4 flex-1 ml-2" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
            : communities.length > 0 &&
            communities.map((community) => (
              <SidebarMenuItem key={community.id} className="px-1.5 md:px-0">
                <SidebarMenuButton
                  onClick={() => handleCommunityClick(community.id)}
                  className="w-full h-full"
                  tooltip={{
                    children: community.title,
                    hidden: false,
                  }}
                >
                  <Avatar className="w-full h-full rounded">
                    <AvatarImage
                      src={community.image || ""}
                      alt={community.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center rounded bg-muted text-xs font-medium">
                      {community.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

          {/* Create Community Button */}
          <SidebarMenuItem>
            <CreateCommunityDialog onCommunityCreated={handleCommunityCreated}>
              <SidebarMenuButton
                className="w-full h-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
                tooltip={{
                  children: "Crear comunidad",
                  hidden: false,
                }}
              >
                <div className="gap-2 w-full rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconPlus className="h-4 w-4" />
                </div>
              </SidebarMenuButton>
            </CreateCommunityDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      {/* Mobile Version - Completamente mejorado */}
      <div className="md:hidden">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Crear una nueva comunidad</h3>
            <CreateCommunityDialog onCommunityCreated={handleCommunityCreated}>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <IconPlus className="h-4 w-4" />
              </Button>
            </CreateCommunityDialog>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-4 gap-2 px-2  p-2">
            {loading
              ? // Mobile Loading Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              ))
              : communities.length > 0
                ? communities.map((community) => (
                  <div
                    key={community.id}
                    onClick={() => handleCommunityClick(community.id)}
                    className="aspect-square cursor-pointer group"
                  >
                    <Avatar className="w-full h-full rounded-lg overflow-hidden">
                      <AvatarImage
                        src={community.image || ""}
                        alt={community.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <AvatarFallback className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-persian-green/20 to-primary/20 text-xs font-bold text-persian-green">
                        {community.title.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))
                : // Empty State
                <div className="col-span-4 flex flex-col items-center justify-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <IconPlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium">No tienes comunidades</p>
                    <p className="text-xs text-muted-foreground">
                      Únete a una o crea la tuya
                    </p>
                  </div>
                  <CreateCommunityDialog onCommunityCreated={handleCommunityCreated}>
                    <Button
                      size="sm"
                      className="bg-persian-green hover:bg-persian-green/90 text-white"
                    >
                      <IconPlus className="h-4 w-4 mr-2" />
                      Crear comunidad
                    </Button>
                  </CreateCommunityDialog>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
