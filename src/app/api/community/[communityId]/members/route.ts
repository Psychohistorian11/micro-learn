import { CommunityMembershipCreateDTO } from "@/interface/community-memberships";
import { userBaseSelect } from "@/lib/prisma-selects";
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

  // If community is public, add membership immediately; otherwise create a join request
  if (existingCommunity.isPublic) {
    const newMembership = await prismadb.user_Community.create({
      data: {
        userId: dto.userId,
        communityId: dto.communityId,
        role: dto.role,
      },
    });
    return NextResponse.json(newMembership);
  }

  // For private communities, ensure there isn't already a pending request
  const existingRequest = await prismadb.community_Request.findFirst({
    where: { userId: dto.userId, communityId: dto.communityId },
  });
  if (existingRequest) {
    return NextResponse.json(
      { message: "Join request already exists" },
      { status: 409 }
    );
  }

  const requestCreated = await prismadb.community_Request.create({
    data: {
      userId: dto.userId,
      communityId: dto.communityId,
    },
  });
  return NextResponse.json({ requested: true, requestId: requestCreated.id });
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
    select: {
      user: {
        select: userBaseSelect,
      },
      role: true,
    },
  });

  const mappedMembers = memberships.map((membership) => {
    return {
      ...membership.user,
      role: membership.role,
    };
  });

  return NextResponse.json(mappedMembers);
}
