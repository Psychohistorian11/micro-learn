import { resourceSelect, userSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = (await context.params) as { id: string };

  const user = await prismadb.user.findUnique({
    where: { id: id },
    select: userSelect,
  });
  return NextResponse.json(user);
}
