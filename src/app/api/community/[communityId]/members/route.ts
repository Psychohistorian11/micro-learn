import { CommunityMembershipCreateDTO } from "@/interface/community-memberships";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };

  const body = await request.json();
  const dto = plainToInstance(CommunityMembershipCreateDTO, {
    ...body,
    communityId,
  });

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const existingUser = await prismadb.user.findFirst({
    where: { id: dto.userId },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const existingCommunity = await prismadb.community.findFirst({
    where: { id: dto.communityId },
  });
  if (!existingCommunity) {
    return NextResponse.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }
  const existingMembership = await prismadb.user_Community.findFirst({
    where: { userId: dto.userId, communityId: dto.communityId },
  });

  if (existingMembership) {
    return NextResponse.json(
      { message: "Membership already exists" },
      { status: 409 }
    );
  }

  const newMembership = await prismadb.user_Community.create({
    data: {
      userId: dto.userId,
      communityId: dto.communityId,
      role: dto.role,
    },
  });

  return NextResponse.json(newMembership);
}

export async function GET(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };

  if (!communityId) {
    return NextResponse.json(
      { message: "communityId is required" },
      { status: 400 }
    );
  }

  const memberships = await prismadb.user_Community.findMany({
    where: { communityId },
  });

  return NextResponse.json(memberships);
}
