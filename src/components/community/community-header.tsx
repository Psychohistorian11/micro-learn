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
  console.log("isJoined", isJoined);
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
      <div className="relative px-6 pb-4">
        <div className="flex items-start justify-between">
          {/* Community Details */}
          <div className="flex items-start gap-4 -mt-11">
            {/* Community Avatar */}
            <Avatar className="w-16 h-16 border-4 border-background shadow-lg">
              <AvatarImage
                src={community.image}
                alt={community.title}
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-serif bg-persian-green/20">
                {community.title.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Community Info */}
            <div className="pt-2">
              <h1 className="text-4xl font-bold font-serif text-foreground">
                {community.title}
              </h1>
              <p className="text-muted-foreground text-sm mb-3 max-w-2xl">
                {community.description}
              </p>

              {/* Community Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{memberCount.toLocaleString()} miembros</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{onlineCount.toLocaleString()} en línea</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Creada hace 2 años</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>Pública</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            {loading ? (
              <Button
                disabled
                className="w-full max-w-xs text-lg font-bold shadow-lg"
              >
                ...
              </Button>
            ) : (
              <Button
                onClick={isJoined ? onLeave : onJoin}
                className={`${
                  isJoined
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-persian-green hover:bg-persian-green/90"
                } w-full max-w-xs text-lg font-bold shadow-lg`}
                size="lg"
              >
                {isJoined ? "Dejar" : "Unirse"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
