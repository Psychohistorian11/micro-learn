import { CommunityUpdateDTO } from "@/interface/community";
import { communityBaseSelect, communitySelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

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
  return NextResponse.json(community);
}

export async function PATCH(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };
  const body = await request.json();
  const dto = plainToInstance(CommunityUpdateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const existingCommunity = await prismadb.community.findFirst({
    where: { id: dto.id },
  });

  if (!existingCommunity) {
    return NextResponse.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }

  const updatedCommunity = await prismadb.community.update({
    where: { id: dto.id },
    data: {
      title: dto.title ?? undefined,
      image: dto.image ?? undefined,
      description: dto.description ?? undefined,
      avatar: dto.avatar ?? undefined,
      isPublic: dto.isPublic ?? undefined,
    },
    select: communitySelect,
  });

  return NextResponse.json(updatedCommunity);
}

export async function DELETE(request: NextRequest, context: any) {
  const { communityId } = (await context.params) as { communityId: string };
  const existingCommunity = await prismadb.community.findFirst({
    where: { id: communityId },
  });
  if (!existingCommunity) {
    return NextResponse.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }
  await prismadb.community.delete({
    where: { id: communityId },
  });
  return NextResponse.json(
    { message: "Community deleted successfully" },
    { status: 200 }
  );
}
