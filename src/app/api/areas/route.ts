import { AreasCreateDTO } from "@/interface/area";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(AreasCreateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const newAreas = await prismadb.area.createMany({
    data: dto.areas.map((area) => ({
      name: area.name,
      color: area.color,
      icon: area.icon,
    })),
  });

  return NextResponse.json(newAreas);
}

export async function GET() {
  try {
    const areas = await prismadb.area.findMany({
      select: {
        id: true,
        name: true,
        color: true,
        icon: true,
      },
    });
    return NextResponse.json(areas);
  } catch (err) {
    console.error("Error fetching areas:", err);
    return NextResponse.json(
      { error: "Error fetching areas" },
      { status: 500 }
    );
  }
}