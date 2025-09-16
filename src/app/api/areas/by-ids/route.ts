// app/api/areas/by-ids/route.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json(
                { error: "Se requiere un array de IDs" },
                { status: 400 }
            );
        }

        const areas = await prismadb.area.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                name: true,
                color: true,
                icon: true
            }
        });

        return NextResponse.json(areas);
    } catch (err) {
        console.error("Error fetching areas by IDs:", err);
        return NextResponse.json(
            { error: "Error fetching areas by IDs" },
            { status: 500 }
        );
    }
}