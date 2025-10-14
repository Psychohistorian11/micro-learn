"use client";

import { Badge } from "@/components/ui/badge";
import { Share2, MessageCircle, Instagram } from "lucide-react";

interface ShareStatsProps {
    shareCount?: number;
    whatsappShares?: number;
    instagramShares?: number;
    className?: string;
}

export function ShareStats({
    shareCount = 0,
    whatsappShares = 0,
    instagramShares = 0,
    className = ""
}: ShareStatsProps) {
    if (shareCount === 0) return null;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Badge variant="secondary" className="text-xs">
                <Share2 className="h-3 w-3 mr-1" />
                {shareCount} compartido{shareCount !== 1 ? 's' : ''}
            </Badge>

            {whatsappShares > 0 && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {whatsappShares} WhatsApp
                </Badge>
            )}

            {instagramShares > 0 && (
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                    <Instagram className="h-3 w-3 mr-1" />
                    {instagramShares} Instagram
                </Badge>
            )}
        </div>
    );
}
