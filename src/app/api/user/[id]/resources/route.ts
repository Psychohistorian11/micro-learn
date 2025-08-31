import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params as { id: string };

  const resources = await prismadb.resource.findMany({
    where: { authorId: id },
    select: resourceSelect,
  });

  return NextResponse.json(resources);
}
