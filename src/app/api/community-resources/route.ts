import { CommunityResourcesCreateDTO } from "@/interface/community-resources";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dto = plainToInstance(CommunityResourcesCreateDTO, body);

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
