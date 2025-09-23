// app/api/areas/by-ids/route.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { communityBaseSelect } from "@/lib/prisma-selects";

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

    const areas = await prismadb.community.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: communityBaseSelect,
    });

    return NextResponse.json(areas);
  } catch (err) {
    console.error("Error fetching communities by IDs:", err);
    return NextResponse.json(
      { error: "Error fetching communities by IDs" },
      { status: 500 }
    );
  }
}
