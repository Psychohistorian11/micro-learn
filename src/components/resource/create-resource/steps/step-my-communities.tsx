"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { CommunityDTO } from "@/interface/community"
import { UseFormReturn } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"
import { CommunityCard } from "../../community-card"

type Props = {
    form: UseFormReturn<ResourceCreateDTO>
}

export default function StepMyCommunities({ form }: Props) {
    const { data: session } = useSession()
    const [communities, setCommunities] = useState<CommunityDTO[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const { watch, setValue } = form
    const selectedCommunities = watch("communities") ?? []

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

        if (selectedCommunities.includes(id)) {
            newCommunities = selectedCommunities.filter((c) => c !== id)
        } else {
            newCommunities = [...selectedCommunities, id]
        }

        setValue("communities", newCommunities.length > 0 ? newCommunities : undefined, {
            shouldValidate: true,
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif">Mis comunidades</h2>

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

            {!loading && communities.length > 0 && (
                <div className="flex flex-col gap-3">
                    {communities.map((community) => (
                        <CommunityCard
                            key={community.id}
                            community={community}
                            selected={selectedCommunities.includes(community.id)}
                            onClick={() => toggleCommunity(community.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}