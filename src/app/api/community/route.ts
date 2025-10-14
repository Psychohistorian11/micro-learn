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
      ...dto,
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
