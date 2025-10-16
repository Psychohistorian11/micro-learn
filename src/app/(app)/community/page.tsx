"use client";

import { CommunitiesSection } from "@/components/community/communities-section-sidebar";
import { useRouter } from "next/navigation";

export default function CommunitiesPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background p-6 md:pb-6">


            {/* Contenido */}
            <div className="">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-serif mb-2">Mis Comunidades</h2>
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