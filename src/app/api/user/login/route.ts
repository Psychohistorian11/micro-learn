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
    console.log("errors", errors);
    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const existingUser: User | null = await prismadb.user.findFirst({
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

    const payload = {
      sub: existingUser.id,
      name: existingUser.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    try {
      const response = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Error encoding jwt" + error },
        { status: 500 }
      );
    }
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user " + error },
      { status: 500 }
    );
  }
}
