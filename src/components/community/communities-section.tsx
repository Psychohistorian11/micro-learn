"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { CommunityCreateDTO, CommunityDTO } from "@/interface/community";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateCommunityDialog } from "./create-community/create-community-dialog";
import { fetchCommunitiesUserById } from "@/lib/services/community-service";

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
      {/* Communities List */}
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
                  <div className="h-full w-full">
                    <img src={community.image} className="w-full h-full"></img>
                  </div>
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
                <Plus className="h-4 w-4" />
              </div>
            </SidebarMenuButton>
          </CreateCommunityDialog>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
