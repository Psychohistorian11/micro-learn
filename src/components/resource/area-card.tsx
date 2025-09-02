import { Area } from "@/lib/area-service"
import { iconsMap } from "@/lib/icons-map"
import { cn } from "@/lib/utils"

type Props = {
    area: Area
    selected?: boolean
    onClick?: () => void
}

export default function AreaCard({ area, selected, onClick }: Props) {
    const Icon = iconsMap[area.icon]

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border shadow-sm transition hover:shadow-md",
                selected ? "bg-gray-100 border-gray-400" : "bg-white"
            )}
        >
            {Icon ? <Icon color={area.color} size={20} /> : <span>❓</span>}
            <span style={{ color: area.color }} className="font-medium">
                {area.name}
            </span>
        </button>
    )
}
