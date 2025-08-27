import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { UserCreateDTO } from "@/interface/user";
import { profile } from "console";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dto = plainToInstance(UserCreateDTO, body);

    const errors = await validate(dto);
    console.log("errors", errors);
    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const existingUser = await prismadb.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await prismadb.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        profilePicture: "", // TODO: Implement placeholder avatar
        description: "Me encanta aprender!",
        role: "student",
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        description: true,
        role: true,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user " + error },
      { status: 500 }
    );
  }
}
