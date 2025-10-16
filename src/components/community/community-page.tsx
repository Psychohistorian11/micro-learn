"use client";

import { CommunityDTO } from "@/interface/community";
import { CommunityHeader } from "./community-header";
import { CommunityPosts } from "./community-posts";
import { CommunityMembers, Member } from "./community-members";
import { CommunitySettingsDialog } from "./community-settings-dialog";
import { CommunityRequestsDialog } from "./community-requests-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    MessageSquare,
    Users,
    Settings,
    BarChart3,
    Filter,
    SortAsc,
    UserPlus,
} from "lucide-react";
import { useCommunityRole } from "@/hooks/use-community-role";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostDTO } from "@/interface/post";
import { joinCommunity, removeMemberFromCommunity, requestToJoinCommunity, fetchCommunityMembers, fetchCommunityRequests } from "@/lib/services/community-service";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CommunityPageProps {
    community: CommunityDTO;
    posts: PostDTO[];
    members: Member[];
    loading?: boolean;
}

export function CommunityPage({
    community,
    posts,
    members,
    loading = false,
}: CommunityPageProps) {
    const [currentCommunity, setCurrentCommunity] = useState(community);
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [currentMembers, setCurrentMembers] = useState(members);
    const [isJoining, setIsJoining] = useState(false);
    const [hasPendingRequest, setHasPendingRequest] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const {
        userId,
        role,
        isLoading: roleLoading,
        isNotMember,
        canManageSettings,
        canModerateContent,
        canManageMembers,
        refreshRole,
    } = useCommunityRole(community.id);

    // Verificar si el usuario tiene una solicitud pendiente
    useEffect(() => {
        const checkPendingRequest = async () => {
            if (!userId || !community.isPublic) {
                try {
                    const requests = await fetchCommunityRequests(community.id);
                    const userRequest = requests.find(req => req.user.id === userId);
                    setHasPendingRequest(!!userRequest);
                } catch (error) {
                    console.error('Error checking pending request:', error);
                }
            }
        };

        checkPendingRequest();
    }, [userId, community.id, community.isPublic]);

    const handleJoin = async () => {
        if (!userId || !session?.user) {
            return;
        }

        try {
            setIsJoining(true);

            if (community.isPublic) {
                // Comunidad pública: unirse directamente
                await joinCommunity(community.id, userId);

                // Add current user to members list immediately
                const currentUser: Member = {
                    id: session.user.id,
                    username: session.user.name || session.user.email?.split('@')[0] || 'usuario',
                    email: session.user.email || '',
                    profilePicture: session.user.image || '',
                    role: 'Member',
                    isOnline: true,
                };

                setCurrentMembers(prev => [...prev, currentUser]);

                // Refresh the role to update isJoined state
                await refreshRole();

                toast.success("¡Te has unido a la comunidad!", {
                    description: "Ahora puedes crear posts y participar en las discusiones."
                });
            } else {
                // Comunidad privada: enviar solicitud
                await requestToJoinCommunity(community.id, userId);
                setHasPendingRequest(true);

                toast.success("¡Solicitud enviada!", {
                    description: "Espera a que un administrador o moderador apruebe tu solicitud para unirte a la comunidad."
                });
            }
        } catch (error) {
            console.error('Error joining community:', error);
            toast.error("Error al unirse a la comunidad. Inténtalo de nuevo.");
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeave = async () => {
        if (!userId) {
            return;
        }

        try {
            setIsJoining(true);
            await removeMemberFromCommunity(community.id, userId);

            // Remove current user from members list immediately
            setCurrentMembers(prev => prev.filter(member => member.id !== userId));

            // Refresh the role to update isJoined state
            await refreshRole();
        } catch (error) {
            console.error('Error leaving community:', error);
        } finally {
            setIsJoining(false);
        }
    };

    const handleCommunityUpdated = (updatedCommunity: CommunityDTO) => {
        setCurrentCommunity(updatedCommunity);
    };

    const handleCommunityDeleted = () => {
        // This will be handled by the router redirect in the dialog
    };

    const handlePostDeleted = (postId: string) => {
        setCurrentPosts((prev) => prev.filter((post) => post.id !== postId));
    };

    const handleMemberRemoved = (memberId: string) => {
        setCurrentMembers((prev) =>
            prev.filter((member) => member.id !== memberId)
        );
    };

    const handleRequestProcessed = async () => {
        // Refrescar la lista de miembros cuando se procese una solicitud
        try {
            const updatedMembers = await fetchCommunityMembers(community.id);
            setCurrentMembers(updatedMembers);
        } catch (error) {
            console.error('Error refreshing members:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-6">
            {/* Community Header - Sticky */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <CommunityHeader
                    community={currentCommunity}
                    memberCount={currentMembers.length}
                    onlineCount={Math.floor(currentMembers.length * 0.1)} // Simulate online count
                    isJoined={!isNotMember}
                    hasPendingRequest={hasPendingRequest}
                    onJoin={handleJoin}
                    onLeave={handleLeave}
                    loading={loading || roleLoading || isJoining}
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Left Column - Posts */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6 min-w-0">
                        {/* Sort and Filter Controls */}
                        <div className="space-y-4">
                            <Tabs defaultValue="posts" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 h-auto">
                                    <TabsTrigger
                                        value="posts"
                                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                                    >
                                        <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                                        <span className="hidden sm:inline">Posts</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="media"
                                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                                    >
                                        <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
                                        <span className="hidden sm:inline">Media</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="about"
                                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                                    >
                                        <Settings className="h-3 w-3 md:h-4 md:w-4" />
                                        <span className="hidden sm:inline">Info</span>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="posts" className="mt-4 md:mt-6">
                                    {/* Sort Controls */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button variant="outline" size="sm" className="text-xs">
                                                <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                                <span className="hidden sm:inline">Filtros</span>
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-xs">
                                                <SortAsc className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                                <span className="hidden sm:inline">Más recientes</span>
                                            </Button>
                                        </div>
                                        {!isNotMember && (
                                            <Button
                                                onClick={() => router.push("/create-resource")}
                                                className="bg-persian-green hover:bg-persian-green/90 text-xs md:text-sm"
                                            >
                                                <span className="hidden sm:inline">Crear Post</span>
                                                <span className="sm:hidden">Crear</span>
                                            </Button>
                                        )}
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
                                        <h3 className="text-lg font-semibold mb-2">
                                            Contenido multimedia
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Aquí se mostrarán los recursos multimedia de la comunidad
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="about" className="mt-6">
                                    <div className="bg-card rounded-lg border p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Sobre esta comunidad
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Descripción</h4>
                                                <p className="text-muted-foreground">
                                                    {community.description}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Reglas</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    <li>• Sé respetuoso con otros miembros</li>
                                                    <li>
                                                        • Mantén el contenido relevante a la comunidad
                                                    </li>
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
                    <div className="space-y-4 md:space-y-6">
                        {/* Members */}
                        <div className="bg-card rounded-lg border p-3 md:p-4">
                            <CommunityMembers
                                members={currentMembers}
                                loading={loading || roleLoading}
                                communityId={community.id}
                                onMemberRemoved={handleMemberRemoved}
                            />
                        </div>

                        {/* Community Stats */}
                        {/* <div className="bg-card rounded-lg border p-3 md:p-4">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Estadísticas
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Miembros
                                    </span>
                                    <span className="text-sm font-medium">
                                        {currentMembers.length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Posts</span>
                                    <span className="text-sm font-medium">
                                        {currentPosts.length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        En línea
                                    </span>
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
                                        <span className="text-sm text-muted-foreground">
                                            Tu rol
                                        </span>
                                        <span className="text-sm font-medium capitalize text-persian-green">
                                            {role}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>*/}

                        {/* Quick Actions - Solo para admin y moderadores */}
                        {(canManageMembers || canManageSettings) && (
                            <div className="bg-card rounded-lg border p-3 md:p-4">
                                <h3 className="font-semibold mb-4">Acciones rápidas</h3>
                                <div className="space-y-2">
                                    {canManageMembers && (
                                        <CommunityRequestsDialog
                                            communityId={community.id}
                                            onRequestProcessed={handleRequestProcessed}
                                        >
                                            <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                                                <UserPlus className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                                Solicitudes pendientes
                                            </Button>
                                        </CommunityRequestsDialog>
                                    )}
                                    {canManageMembers && (
                                        <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                                            <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                            Invitar miembros
                                        </Button>
                                    )}
                                    {canManageSettings && (
                                        <CommunitySettingsDialog
                                            community={currentCommunity}
                                            onCommunityUpdated={handleCommunityUpdated}
                                            onCommunityDeleted={handleCommunityDeleted}
                                        >
                                            <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                                                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                                Configuración
                                            </Button>
                                        </CommunitySettingsDialog>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
