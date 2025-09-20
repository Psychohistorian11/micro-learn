import {
  ResourceCreateDTO,
  ResourceDTO,
  ResourceUpdateDTO,
} from "@/interface/resource";
import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(ResourceCreateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const existingUser = await prismadb.user.findFirst({
    where: { id: dto.authorId },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const newResource = await prismadb.resource.create({
    data: {
      title: dto.title,
      isPublic: dto.isPublic ?? false,
      image: dto.image ?? "",
      description: dto.description,
      attachment: dto.attachment,
      type: dto.type,
      authorId: dto.authorId,
      areas: dto.areas
        ? { connect: dto.areas.map((id) => ({ id })) }
        : undefined,
      communities: dto.communities
        ? { connect: dto.communities.map((id) => ({ id })) }
        : undefined,
    },
    select: resourceSelect,
  });

  return NextResponse.json(newResource);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const dto = plainToInstance(ResourceUpdateDTO, body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }
  const existingResource = await prismadb.resource.findUnique({
    where: { id: dto.id },
    select: resourceSelect,
  });

  if (!existingResource) {
    return NextResponse.json(
      { message: "Resource not found" },
      { status: 404 }
    );
  }

  const updatedResource = await prismadb.resource.update({
    where: { id: dto.id },
    data: {
      title: dto.title ?? existingResource.title,
      isPublic: dto.isPublic ?? existingResource.isPublic,
      image: dto.image ?? existingResource.image,
      description: dto.description ?? existingResource.description,
      attachment: dto.attachment ?? existingResource.attachment,
      type: dto.type ?? existingResource.type,
      updatedAt: new Date(),
      areas: dto.areas
        ? { set: dto.areas.map((id) => ({ id })) } // reemplaza con nuevas
        : undefined, // no cambia nada si no vino en dto

      communities: dto.communities
        ? { set: dto.communities.map((id) => ({ id })) }
        : undefined,
    },
    select: resourceSelect,
  });

  return NextResponse.json(updatedResource);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const resources = await prismadb.resource.findMany({
    where: {
      title: {
        contains: searchParams.get("query") || "",
        mode: "insensitive",
      },
    },
    select: resourceSelect,
  });

  return NextResponse.json(resources);
}