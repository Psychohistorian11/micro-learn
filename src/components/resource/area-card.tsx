// components/area-card.tsx
import { AreaDTO } from "@/interface/area"
import { iconsMap } from "@/lib/icons-map"
import { cn } from "@/lib/utils"
import { IconCloud } from "@tabler/icons-react"
import { IconClipboardList } from "@tabler/icons-react"

type Props = {
    area: AreaDTO
    selected?: boolean
    onClick?: () => void
}

export default function AreaCard({ area, selected, onClick }: Props) {

    const Icon = iconsMap[area.icon]
    console.log("Icon: ", Icon)


    return (
        <button
            onClick={onClick}
            className={cn(
                "  flex items-center gap-2 rounded-sm cursor-pointer border shadow-sm transition-all hover:shadow-md p-1.5",
                selected ? "border-persian-green border-2" : "border-gray-800"
            )}
            style={{
                width: 'fit-content',
                whiteSpace: 'nowrap'
            }}
        >
            {Icon ? (
                <Icon size={16} color={area.color} />
            ) : (
                <IconCloud size={16} />
            )}
            <span className="text-xs font-medium">
                {area.name}
            </span>
        </button>
    )
}