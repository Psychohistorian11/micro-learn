import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { User, UserLoginDTO, UserResponseDTO } from "@/interface/user";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dto = plainToInstance(UserLoginDTO, body);

    const errors = await validate(dto);
    console.log("errors", errors);
    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const existingUser: User | null = await prismadb.users.findFirst({
      where: { email: dto.email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Email or password incorrect" },
        { status: 401 }
      );
    }
    const matchPassword = await bcrypt.compare(
      dto.password,
      existingUser.password!
    );

    if (!matchPassword) {
      return NextResponse.json(
        { message: "Email or password incorrect" },
        { status: 401 }
      );
    }

    const userResponse = plainToInstance(UserResponseDTO, existingUser);

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user " + error },
      { status: 500 }
    );
  }
}
