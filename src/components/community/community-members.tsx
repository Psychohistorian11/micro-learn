"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Crown,
    Shield,
    UserPlus,
    Search,
    MoreHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CommunityMemberActions } from "./community-member-actions";

interface Member {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    role: "admin" | "moderator" | "member";
    joinedAt: string;
    isOnline?: boolean;
}

interface CommunityMembersProps {
    members: Member[];
    loading?: boolean;
    communityId: string;
    onMemberRemoved?: (memberId: string) => void;
}

export function CommunityMembers({ members, loading = false, communityId, onMemberRemoved }: CommunityMembersProps) {
    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin":
                return <Crown className="h-3 w-3 text-yellow-500" />;
            case "moderator":
                return <Shield className="h-3 w-3 text-blue-500" />;
            default:
                return null;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "moderator":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5" />
                    <h3 className="font-semibold">Miembros</h3>
                </div>

                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 animate-pulse">
                            <div className="w-8 h-8 bg-muted rounded-full" />
                            <div className="flex-1 space-y-1">
                                <div className="h-3 bg-muted rounded w-1/2" />
                                <div className="h-2 bg-muted rounded w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h3 className="font-semibold">Miembros</h3>
                    <Badge variant="secondary" className="text-xs">
                        {members.length}
                    </Badge>
                </div>
                <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar miembros..."
                    className="pl-10"
                />
            </div>

            {/* Members List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                        <div className="relative">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="text-xs">
                                    {member.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {member.isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium truncate">
                                    {member.name}
                                </span>
                                {getRoleIcon(member.role)}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                    @{member.username}
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs ${getRoleColor(member.role)}`}
                                >
                                    {member.role}
                                </Badge>
                            </div>
                        </div>

                        <CommunityMemberActions
                            member={member}
                            communityId={communityId}
                            onMemberRemoved={onMemberRemoved}
                        />
                    </div>
                ))}
            </div>

            {/* Invite Button */}
            <Button
                variant="outline"
                className="w-full text-persian-green border-persian-green hover:bg-persian-green/10"
            >
                <UserPlus className="h-4 w-4 mr-2" />
                Invitar miembros
            </Button>
        </div>
    );
}
