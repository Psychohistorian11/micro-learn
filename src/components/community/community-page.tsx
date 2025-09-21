"use client";

import { CommunityDTO } from "@/interface/community";
import { ResourceDTO } from "@/interface/resource";
import { CommunityHeader } from "./community-header";
import { CommunityPosts } from "./community-posts";
import { CommunityMembers } from "./community-members";
import { CommunitySettingsDialog } from "./community-settings-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    MessageSquare,
    Users,
    Settings,
    BarChart3,
    Filter,
    SortAsc
} from "lucide-react";
import { useCommunityRole } from "@/hooks/use-community-role";
import { useState } from "react";

interface CommunityPageProps {
    community: CommunityDTO;
    posts: ResourceDTO[];
    members: any[];
    loading?: boolean;
}

export function CommunityPage({
    community,
    posts,
    members,
    loading = false
}: CommunityPageProps) {
    const [currentCommunity, setCurrentCommunity] = useState(community);
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [currentMembers, setCurrentMembers] = useState(members);

    const {
        role,
        isLoading: roleLoading,
        isNotMember,
        canManageSettings,
        canModerateContent,
        canManageMembers
    } = useCommunityRole(community.id);

    const handleJoin = () => {
        // TODO: Implement join logic
        console.log("Joining community:", community.id);
    };

    const handleLeave = () => {
        // TODO: Implement leave logic
        console.log("Leaving community:", community.id);
    };

    const handleCommunityUpdated = (updatedCommunity: CommunityDTO) => {
        setCurrentCommunity(updatedCommunity);
    };

    const handleCommunityDeleted = () => {
        // This will be handled by the router redirect in the dialog
    };

    const handlePostDeleted = (postId: string) => {
        setCurrentPosts(prev => prev.filter(post => post.id !== postId));
    };

    const handleMemberRemoved = (memberId: string) => {
        setCurrentMembers(prev => prev.filter(member => member.id !== memberId));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Community Header */}
            <CommunityHeader
                community={currentCommunity}
                memberCount={currentMembers.length}
                onlineCount={Math.floor(currentMembers.length * 0.1)} // Simulate online count
                isJoined={!isNotMember}
                onJoin={handleJoin}
                onLeave={handleLeave}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Posts */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Sort and Filter Controls */}
                        <div className="flex items-center justify-between">
                            <Tabs defaultValue="posts" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="posts" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Posts
                                    </TabsTrigger>
                                    <TabsTrigger value="media" className="flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        Media
                                    </TabsTrigger>
                                    <TabsTrigger value="about" className="flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        Info
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="posts" className="mt-6">
                                    {/* Sort Controls */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Filter className="h-4 w-4 mr-2" />
                                                Filtros
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <SortAsc className="h-4 w-4 mr-2" />
                                                Más recientes
                                            </Button>
                                        </div>
                                        <Button className="bg-persian-green hover:bg-persian-green/90">
                                            Crear Post
                                        </Button>
                                    </div>

                                    {/* Posts */}
                                    <CommunityPosts
                                        posts={currentPosts}
                                        loading={loading || roleLoading}
                                        communityId={community.id}
                                        onPostDeleted={handlePostDeleted}
                                    />
                                </TabsContent>

                                <TabsContent value="media" className="mt-6">
                                    <div className="text-center py-12">
                                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">Contenido multimedia</h3>
                                        <p className="text-muted-foreground">
                                            Aquí se mostrarán los recursos multimedia de la comunidad
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="about" className="mt-6">
                                    <div className="bg-card rounded-lg border p-6">
                                        <h3 className="text-lg font-semibold mb-4">Sobre esta comunidad</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Descripción</h4>
                                                <p className="text-muted-foreground">{community.description}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Reglas</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    <li>• Sé respetuoso con otros miembros</li>
                                                    <li>• Mantén el contenido relevante a la comunidad</li>
                                                    <li>• No compartas contenido inapropiado</li>
                                                    <li>• Usa títulos descriptivos para tus posts</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* Right Column - Members and Info */}
                    <div className="space-y-6">
                        {/* Members */}
                        <div className="bg-card rounded-lg border p-4">
                            <CommunityMembers
                                members={currentMembers}
                                loading={loading || roleLoading}
                                communityId={community.id}
                                onMemberRemoved={handleMemberRemoved}
                            />
                        </div>

                        {/* Community Stats */}
                        <div className="bg-card rounded-lg border p-4">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Estadísticas
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Miembros</span>
                                    <span className="text-sm font-medium">{currentMembers.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Posts</span>
                                    <span className="text-sm font-medium">{currentPosts.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">En línea</span>
                                    <span className="text-sm font-medium text-green-500">
                                        {Math.floor(currentMembers.length * 0.1)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Creada</span>
                                    <span className="text-sm font-medium">Hace 2 años</span>
                                </div>
                                {role && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Tu rol</span>
                                        <span className="text-sm font-medium capitalize text-persian-green">
                                            {role}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-card rounded-lg border p-4">
                            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
                            <div className="space-y-2">
                                {!isNotMember && (
                                    <Button variant="outline" className="w-full justify-start">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Crear post
                                    </Button>
                                )}
                                {canManageMembers && (
                                    <Button variant="outline" className="w-full justify-start">
                                        <Users className="h-4 w-4 mr-2" />
                                        Invitar miembros
                                    </Button>
                                )}
                                {canManageSettings && (
                                    <CommunitySettingsDialog
                                        community={currentCommunity}
                                        onCommunityUpdated={handleCommunityUpdated}
                                        onCommunityDeleted={handleCommunityDeleted}
                                    >
                                        <Button variant="outline" className="w-full justify-start">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Configuración
                                        </Button>
                                    </CommunitySettingsDialog>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
