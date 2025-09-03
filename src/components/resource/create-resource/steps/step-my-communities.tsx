"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { CommunityDTO } from "@/interface/community"
import { Plus, Check } from "lucide-react"
import ResourceProps from "@/interface/resource"

export default function StepMyCommunities({ data, onUpdate }: ResourceProps) {
    const { data: session } = useSession()
    const [communities, setCommunities] = useState<CommunityDTO[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!session?.user?.id) return

        const t = setTimeout(() => {
            setCommunities([
                {
                    id: "1234567689",
                    title: "Pythonhunters",
                    description: "Comunidad para auténticos lovers a Python",
                    image: "https://placehold.co/100x100?text=Python",
                },
                {
                    id: "9876543210",
                    title: "NextJS Masters",
                    description: "Compartimos todo sobre React y Next.js",
                    image: "https://placehold.co/100x100?text=Next",
                },
            ])
            setLoading(false)
        }, 1000)

        return () => clearTimeout(t)
    }, [session?.user?.id])

    const toggleCommunity = (id: string) => {
        let newCommunities: string[]

        if (data.communities?.includes(id)) {
            newCommunities = data.communities.filter((c) => c !== id)
        } else {
            newCommunities = [...(data.communities ?? []), id]
        }

        // igual que en StepAreas: si no queda ninguna, lo ponemos como undefined
        onUpdate({ communities: newCommunities.length > 0 ? newCommunities : undefined })
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif">Mis comunidades</h2>

            {/* Loading state */}
            {loading && (
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col sm:flex-row gap-4 p-3 rounded-md shadow-sm"
                        >
                            <Skeleton className="h-[125px] w-full rounded-xl sm:h-12 sm:w-12 sm:rounded-full" />
                            <div className="flex flex-col justify-center space-y-2 w-full">
                                <Skeleton className="h-4 w-[85%] sm:w-[320px] lg:w-[600px]" />
                                <Skeleton className="h-4 w-[70%] sm:w-[260px] lg:w-[400px]" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && communities.length === 0 && (
                <div className="gap-4 flex flex-col items-start text-center">
                    <Label>No perteneces a ninguna comunidad todavía.</Label>
                    <Button
                        onClick={() => router.push("/communities")}
                        className="bg-persian-green w-full sm:w-auto"
                    >
                        Explorar comunidades
                    </Button>
                </div>
            )}

            {/* Communities list */}
            {!loading && communities.length > 0 && (
                <div className="flex flex-col gap-4">
                    {communities.map((community) => {
                        const selected = data.communities?.includes(community.id) ?? false
                        return (
                            <div
                                key={community.id}
                                className="flex items-center justify-between gap-4 p-3 border rounded-md shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={community.image}
                                        alt={community.title}
                                        className="rounded-full object-cover w-12 h-12"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-persian-green">
                                            {community.title}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {community.description}
                                        </span>
                                    </div>
                                </div>

                                {/* Botón publicar */}
                                <Button
                                    variant={selected ? "default" : "outline"}
                                    className={
                                        selected
                                            ? "bg-persian-green  hover:bg-persian-green/90"
                                            : "border-persian-green text-persian-green hover:bg-persian-green/10"
                                    }
                                    onClick={() => toggleCommunity(community.id)}
                                >
                                    {selected ? (
                                        <>
                                            <Check className="w-4 h-4 mr-2" /> Seleccionada
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 mr-2" /> Publicar aquí
                                        </>
                                    )}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
