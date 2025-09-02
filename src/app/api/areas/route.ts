
import { AreaCreateDTO } from "@/interface/area";
import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(AreaCreateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const newAreas = await prismadb.area.createMany({
    data: dto.names.map((name) => ({ name })),
  });

  return NextResponse.json(newAreas);
}
