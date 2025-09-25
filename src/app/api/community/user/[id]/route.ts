import { communityBaseSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = (await context.params) as { id: string };

  const community = await prismadb.community.findMany({
    where: { users: { some: { userId: id } } },
    select: communityBaseSelect,
  });
  return NextResponse.json(community);
}
