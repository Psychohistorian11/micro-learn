import { CommunityCreateDTO, CommunityUpdateDTO } from "@/interface/community";
import { communitySelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(CommunityCreateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const existingUser = await prismadb.user.findFirst({
    where: { id: dto.adminId },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const newCommunity = await prismadb.community.create({
    data: {
      title: dto.title,
      image: dto.image ?? undefined,
      description: dto.description,
      users: {
        create: {
          user: {
            connect: { id: dto.adminId },
          },
          role: "Admin",
        },
      },
    },
    select: communitySelect,
  });

  return NextResponse.json(newCommunity);
}

export async function PATCH(request: NextRequest) {
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
    },
    select: communitySelect,
  });

  return NextResponse.json(updatedCommunity);
}

