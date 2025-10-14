"use client";

import { CommunitiesSection } from "@/components/community/communities-section-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommunitiesPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-6">
            {/* Header móvil */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="flex items-center gap-3 p-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="md:hidden"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-persian-green" />
                        <h1 className="text-lg font-semibold">Comunidades</h1>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Mis Comunidades</h2>
                        <p className="text-muted-foreground">
                            Explora y gestiona las comunidades a las que perteneces
                        </p>
                    </div>

                    {/* Sección de comunidades - versión móvil */}
                    <div className="bg-card rounded-lg border shadow-sm">
                        <CommunitiesSection />
                    </div>
                </div>
            </div>
        </div>
    );
}