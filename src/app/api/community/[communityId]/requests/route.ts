import { CommunityUpdateDTO } from "@/interface/community";
import { communityBaseSelect, communitySelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { userBaseSelect } from "@/lib/prisma-selects";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { CommunityRequestUpdateDTO } from "@/interface/community-request";
import { CommunityRole, RequestStatus } from "@prisma/client";

export async function GET(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };

  const community = await prismadb.community.findFirst({
    where: { id: communityId },
    select: communityBaseSelect,
  });
  if (!community) {
    return NextResponse.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }

  const requests = await prismadb.community_Request.findMany({
    where: { communityId },
    select: {
      id: true,
      createdAt: true,
      user: { select: userBaseSelect },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(requests);
}

export async function PUT(request: NextRequest, context: any) {
  const { communityId } = context.params as { communityId: string };
  const body = await request.json();

  const dto = plainToInstance(CommunityRequestUpdateDTO, body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  if (!communityId) {
    return NextResponse.json(
      { message: "communityId is required" },
      { status: 400 }
    );
  }

  const updatedRequest = await prismadb.community_Request.update({
    where: { id: dto.id },
    data: {
      status: dto.status,
      respondedAt: new Date(),
    },
  });

  if (dto.status == RequestStatus.Accepted) {
    await prismadb.user_Community.create({
      data: {
        userId: updatedRequest.userId,
        communityId: updatedRequest.communityId,
        role: CommunityRole.Member,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
