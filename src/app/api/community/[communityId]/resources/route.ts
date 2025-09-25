import { CommunityResourcesCreateDTO } from "@/interface/community-resources";
import { resourceBaseSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: any) {
  try {
    const { communityId } = (await context.params) as { communityId: string };

    const body = await request.json();
    const dto = plainToInstance(CommunityResourcesCreateDTO, {
      ...body,
      communityId,
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const existingResource = await prismadb.resource.findFirst({
      where: { id: dto.resourceId },
    });

    if (!existingResource) {
      return NextResponse.json(
        { message: "Resource not found" },
        { status: 404 }
      );
    }

    const existingCommunity = await prismadb.community.findFirst({
      where: { id: dto.communityId },
    });
    if (!existingCommunity) {
      return NextResponse.json(
        { message: "Community not found" },
        { status: 404 }
      );
    }

    const existingPost = await prismadb.resource_Community.findFirst({
      where: { resourceId: dto.resourceId, communityId: dto.communityId },
    });

    if (existingPost) {
      return NextResponse.json(
        { message: "Resource is already posted in this community" },
        { status: 409 }
      );
    }

    const newPost = await prismadb.resource_Community.create({
      data: { resourceId: dto.resourceId, communityId: dto.communityId },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando relación" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, context: any) {
  //TODO: Más adelante agregar quey params
  const { communityId } = (await context.params) as { communityId: string };

  if (!communityId) {
    return NextResponse.json(
      { message: "communityId is required" },
      { status: 400 }
    );
  }

  const postedResources = await prismadb.resource_Community.findMany({
    where: { communityId },
    select: {
      resource: {
        select: resourceBaseSelect,
      },
    },
  });

  const convertedList = postedResources.map((item) => item.resource);

  return NextResponse.json(convertedList);
}
