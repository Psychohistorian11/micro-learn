import { userBaseSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { communityId, userId } = (await context.params) as {
    communityId: string;
    userId: string;
  };

  if (!communityId) {
    return NextResponse.json(
      { message: "communityId is required" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }

  const membership = await prismadb.user_Community.findFirst({
    where: { communityId, userId },
    select: {
      user: {
        select: userBaseSelect,
      },
      role: true,
    },
  });

  if (!membership) {
    return NextResponse.json({ role: null });
  }
  const mappedMembership = {
    role: membership.role,
  };
  return NextResponse.json(mappedMembership);
}
