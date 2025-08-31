import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const resources = await prismadb.resource.findMany({
    where: { authorId: params.id },
    select: resourceSelect,
  });

  return NextResponse.json(resources);
}
