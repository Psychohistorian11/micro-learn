import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { User, UserLoginDTO, UserResponseDTO } from "@/interface/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dto = plainToInstance(UserLoginDTO, body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const existingUser = await prismadb.user.findFirst({
      where: { email: dto.email },
      select: { id: true, username: true, email: true, profilePicture: true, role: true, password: true },
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

    const payload = {
      sub: existingUser.id,
      name: existingUser.username ?? existingUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const user = {
      id: existingUser.id,
      username: existingUser.username ?? existingUser.email.split("@")[0],
      email: existingUser.email,
      profilePicture: existingUser.profilePicture ?? "",
      role: existingUser.role ?? "student",
    };

    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Error creating user: ", error);
    return NextResponse.json(
      { message: "Error creating user: " + error },
      { status: 500 }
    );
  }
}
