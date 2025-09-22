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
  });

  if (!membership) {
    return NextResponse.json(
      { message: "Membership not found for this user in the community" },
      { status: 404 }
    );
  }

  return NextResponse.json(membership);
}
