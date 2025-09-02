import { UserUpdateDTO } from "@/interface/user";
import { userSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(UserUpdateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }
  const existingUser = await prismadb.user.findUnique({
    where: { id: dto.id },
    select: { ...userSelect, password: true },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (dto.username && dto.username !== existingUser.username) {
    const userWithSameUsername = await prismadb.user.findUnique({
      where: { username: dto.username },
      select: { id: true },
    });
    if (userWithSameUsername) {
      return NextResponse.json(
        { message: "El nombre de usuario ya esta en uso" },
        { status: 409 }
      );
    }
  }

  if (dto.password) {
    const matchPassword = await bcrypt.compare(
      dto.password,
      existingUser.password
    );
    if (matchPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    dto.password = await bcrypt.hash(dto.password, 10);
  }

  const updatedUser = await prismadb.user.update({
    where: { id: dto.id },
    data: {
      username: dto.username ?? existingUser.username,
      password: dto.password ?? existingUser.password,
      profilePicture: dto.profilePicture ?? existingUser.profilePicture,
      description: dto.description ?? existingUser.description,
    },
    select: userSelect,
  });

  return NextResponse.json(updatedUser);
}
