"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import ResourcePreview from "../resource-preview"

type Props = {
    open: boolean
    onClose: () => void
    attachment?: string
    title?: string
    description?: string
}

export default function ResourcePreviewSheet({
    open,
    onClose,
    attachment,
    title,
    description,
}: Props) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-1/2 "
            >
                <SheetHeader className="p-6">
                    <SheetTitle className="flex items-center justify-between">
                        <span className="text-2xl font-serif">{title || "Vista previa del recurso"}</span>
                    </SheetTitle>
                    {description && (
                        <SheetDescription className="text-sm text-muted-foreground">
                            {description}
                        </SheetDescription>
                    )}
                </SheetHeader>

                <div className=" p-4 h-full">
                    <ResourcePreview
                        attachment={attachment}
                        className="rounded-md"
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}
