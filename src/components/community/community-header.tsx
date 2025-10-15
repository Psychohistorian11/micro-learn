"use client";

import { CommunityDTO } from "@/interface/community";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityHeaderProps {
  community: CommunityDTO;
  memberCount?: number;
  onlineCount?: number;
  isJoined?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  loading?: boolean;
}

export function CommunityHeader({
  community,
  memberCount = 0,
  onlineCount = 0,
  isJoined = false,
  onJoin,
  onLeave,
  loading,
}: CommunityHeaderProps) {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-32 bg-gradient-to-r from-persian-green/20 to-primary/20 relative overflow-hidden">
        {community.image ? (
          <img
            src={community.image}
            alt={`${community.title} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-persian-green/30 to-primary/30 flex items-center justify-center">
            <div className="text-6xl font-serif text-white/50">
              {community.title.substring(0, 2).toUpperCase()}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Community Info */}
      <div className="relative px-4 md:px-6 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Community Details */}
          <div className="flex items-start gap-3 md:gap-4 -mt-11 min-w-0 flex-1">
            {/* Community Avatar */}
            <Avatar className="w-12 h-12 md:w-16 md:h-16 border-4 border-background shadow-lg shrink-0">
              <AvatarImage
                src={community.image}
                alt={community.title}
                className="object-cover"
              />
              <AvatarFallback className="text-sm md:text-lg font-serif bg-persian-green/20">
                {community.title.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Community Info */}
            <div className="pt-2 min-w-0 flex-1">
              <h1 className="text-2xl md:text-4xl font-bold font-serif text-foreground break-words">
                {community.title}
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm mb-3 max-w-2xl break-words">
                {community.description}
              </p>

              {/* Community Stats */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{memberCount.toLocaleString()} miembros</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{onlineCount.toLocaleString()} en línea</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Creada hace 2 años</span>
                  <span className="sm:hidden">Hace 2 años</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Pública</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center lg:justify-end pt-2 lg:pt-4 w-full lg:w-auto">
            {loading ? (
              <Button
                disabled
                size="sm"
                className="text-xs md:text-sm"
              >
                ...
              </Button>
            ) : (
              <Button
                onClick={isJoined ? onLeave : onJoin}
                size="sm"
                variant={isJoined ? "outline" : "default"}
                className={`${isJoined
                  ? "text-muted-foreground hover:text-foreground"
                  : "bg-persian-green hover:bg-persian-green/90 text-white"
                  } text-xs md:text-sm`}
              >
                {isJoined ? "Dejar" : "Solicitar unirse"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
