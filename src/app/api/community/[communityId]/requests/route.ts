import { CommunityUpdateDTO } from "@/interface/community";
import { communityBaseSelect, communitySelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { userBaseSelect } from "@/lib/prisma-selects";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { CommunityRequestCreateDTO, CommunityRequestUpdateDTO } from "@/interface/community-request";
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
    where: {
      communityId,
      status: "Pending"
    },
    select: {
      id: true,
      createdAt: true,
      user: { select: userBaseSelect },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(requests);
}

export async function POST(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };
  const body = await request.json();

  const dto = plainToInstance(CommunityRequestCreateDTO, { ...body, communityId });
  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  // Verificar si la comunidad existe
  const community = await prismadb.community.findFirst({
    where: { id: communityId },
    select: { id: true },
  });

  if (!community) {
    return NextResponse.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }

  // Verificar si el usuario ya es miembro
  const existingMembership = await prismadb.user_Community.findFirst({
    where: {
      userId: dto.userId,
      communityId: dto.communityId,
    },
  });

  if (existingMembership) {
    return NextResponse.json(
      { message: "User is already a member of this community" },
      { status: 400 }
    );
  }

  // Verificar si ya existe una solicitud pendiente
  const existingRequest = await prismadb.community_Request.findFirst({
    where: {
      userId: dto.userId,
      communityId: dto.communityId,
      status: "Pending",
    },
  });

  if (existingRequest) {
    return NextResponse.json(
      { message: "Join request already exists" },
      { status: 400 }
    );
  }

  // Crear la solicitud
  const newRequest = await prismadb.community_Request.create({
    data: {
      userId: dto.userId,
      communityId: dto.communityId,
      status: "Pending",
    },
  });

  return NextResponse.json(newRequest, { status: 201 });
}

export async function PUT(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };
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
