"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    IconUsers,
    IconCheck,
    IconX,
    IconClock,
    IconUserPlus,
    IconUserMinus
} from "@tabler/icons-react";
import { UserResponseDTO } from "@/interface/user";
import {
    fetchCommunityRequests,
    approveCommunityRequest,
    rejectCommunityRequest
} from "@/lib/services/community-service";
import { toast } from "sonner";

interface CommunityRequest {
    id: string;
    createdAt: string;
    user: UserResponseDTO;
}

interface CommunityRequestsDialogProps {
    communityId: string;
    onRequestProcessed?: () => void;
    children: React.ReactNode;
}

export function CommunityRequestsDialog({
    communityId,
    onRequestProcessed,
    children,
}: CommunityRequestsDialogProps) {
    const [requests, setRequests] = useState<CommunityRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await fetchCommunityRequests(communityId);
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Error al cargar las solicitudes");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId: string) => {
        try {
            setProcessing(requestId);
            await approveCommunityRequest(communityId, requestId);

            // Remover la solicitud de la lista
            setRequests(prev => prev.filter(req => req.id !== requestId));

            toast.success("Solicitud aprobada", {
                description: "El usuario ahora es miembro de la comunidad"
            });
            onRequestProcessed?.();
        } catch (error) {
            console.error("Error approving request:", error);
            toast.error("Error al aprobar la solicitud", {
                description: "Inténtalo de nuevo"
            });
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            setProcessing(requestId);
            await rejectCommunityRequest(communityId, requestId);

            // Remover la solicitud de la lista
            setRequests(prev => prev.filter(req => req.id !== requestId));

            toast.success("Solicitud rechazada", {
                description: "La solicitud ha sido rechazada"
            });
            onRequestProcessed?.();
        } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("Error al rechazar la solicitud", {
                description: "Inténtalo de nuevo"
            });
        } finally {
            setProcessing(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return "Hace menos de 1 hora";
        } else if (diffInHours < 24) {
            return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild onClick={fetchRequests}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <IconUsers className="h-5 w-5" />
                        Solicitudes pendientes
                    </DialogTitle>
                    <DialogDescription>
                        Gestiona las solicitudes de usuarios que quieren unirse a la comunidad
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
                                    <Skeleton className="w-12 h-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-3 w-1/3" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-20" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="text-center py-12">
                            <IconUserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No hay solicitudes pendientes
                            </h3>
                            <p className="text-muted-foreground">
                                Cuando los usuarios soliciten unirse, aparecerán aquí
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage
                                            src={request.user.profilePicture}
                                            alt={request.user.username}
                                        />
                                        <AvatarFallback>
                                            {request.user.username.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold truncate">
                                                {request.user.username}
                                            </h4>
                                            <Badge variant="secondary" className="text-xs">
                                                <IconClock className="h-3 w-3 mr-1" />
                                                {formatDate(request.createdAt)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            @{request.user.username}
                                        </p>
                                        {request.user.description && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {request.user.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleReject(request.id)}
                                            disabled={processing === request.id}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            {processing === request.id ? (
                                                <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                                            ) : (
                                                <IconX className="h-4 w-4 mr-1" />
                                            )}
                                            {processing === request.id ? "Procesando..." : "Rechazar"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleApprove(request.id)}
                                            disabled={processing === request.id}
                                            className="bg-persian-green hover:bg-persian-green/90"
                                        >
                                            {processing === request.id ? (
                                                <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            ) : (
                                                <IconCheck className="h-4 w-4 mr-1" />
                                            )}
                                            {processing === request.id ? "Procesando..." : "Aprobar"}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {requests.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{requests.length} solicitud{requests.length !== 1 ? 'es' : ''} pendiente{requests.length !== 1 ? 's' : ''}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={fetchRequests}
                                disabled={loading}
                            >
                                Actualizar
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
