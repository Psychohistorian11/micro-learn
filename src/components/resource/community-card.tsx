// components/community-card.tsx
import { CommunityDTO } from "@/interface/community"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type Props = {
    community: CommunityDTO
    selected?: boolean
    onClick?: () => void
}

export default function CommunityCard({ community, selected, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 p-3 rounded-md border shadow-sm transition-all hover:shadow-md w-full",
                selected
                    ? "border-persian-green border-2 bg-persian-green/5"
                    : "border-gray-800"
            )}
        >
            <img
                src={community.image}
                alt={community.title}
                className="rounded-full object-cover w-10 h-10"
            />

            <div className="flex flex-col items-start flex-1">
                <span className={cn(
                    "font-medium text-sm",
                    selected ? "text-persian-green" : "text-gray-800"
                )}>
                    {community.title}
                </span>
                <span className="text-xs text-gray-600 text-left">
                    {community.description}
                </span>
            </div>

            <div className={cn(
                "flex items-center justify-center w-5 h-5 rounded-full border",
                selected
                    ? "bg-persian-green border-persian-green text-white"
                    : "border-gray-800"
            )}>
                {selected && <Check size={14} />}
            </div>
        </button>
    )
}