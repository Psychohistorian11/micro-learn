"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
    return (
        <div className="w-full rounded bg-card shadow-sm p-6 flex flex-col sm:flex-row gap-6">
            {/* Avatar skeleton */}
            <div className="shrink-0 w-full sm:w-auto">
                <Skeleton className="w-32 h-32 rounded-xl" />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                        {/* Username skeleton */}
                        <Skeleton className="h-8 w-48 mb-2" />
                        {/* Email skeleton */}
                        <Skeleton className="h-4 w-64" />
                    </div>
                    {/* Edit button skeleton */}
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
                {/* Description skeleton */}
                <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    );
}

export function ResourceListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded bg-card shadow-sm p-4">
                    <div className="flex items-start gap-4">
                        {/* Resource image/recurso skeleton */}
                        <Skeleton className="w-20 h-20 rounded" />
                        <div className="flex-1 space-y-2">
                            {/* Header with title and badges */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    {/* Title skeleton */}
                                    <Skeleton className="h-5 w-3/4" />
                                    {/* Badges skeleton */}
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-16 rounded-sm" />
                                        <Skeleton className="h-5 w-12 rounded-sm" />
                                    </div>
                                </div>
                                {/* Action buttons skeleton */}
                                <div className="flex gap-1">
                                    <Skeleton className="h-6 w-6 rounded" />
                                    <Skeleton className="h-6 w-6 rounded" />
                                </div>
                            </div>

                            {/* Description skeleton */}
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />

                            {/* Tags skeleton */}
                            <div className="flex gap-2">
                                {Array.from({ length: 2 }).map((_, j) => (
                                    <Skeleton key={j} className="h-5 w-16 rounded-full" />
                                ))}
                            </div>

                            {/* Communities button skeleton */}
                            <Skeleton className="h-8 w-full rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
