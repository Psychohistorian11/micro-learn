import { SearchDTO } from "@/interface/search";
import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(SearchDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const { query_text, area_ids } = dto;

  const resources = await prismadb.resource.findMany({
    where: {
      OR: [
        query_text
          ? {
              OR: [
                { title: { contains: query_text, mode: "insensitive" } },
                { description: { contains: query_text, mode: "insensitive" } },
              ],
            }
          : {},

        area_ids?.length
          ? {
              areas: {
                some: { areaId: { in: area_ids } },
              },
            }
          : {},
      ],
    },
    select: resourceSelect,
  });

  const communities = query_text
    ? await prismadb.community.findMany({
        where: {
          OR: [
            { title: { contains: query_text, mode: "insensitive" } },
            { description: { contains: query_text, mode: "insensitive" } },
          ],
        },
      })
    : [];

  return NextResponse.json({
    message: "Search successful",
    resources,
    communities,
  });
}
