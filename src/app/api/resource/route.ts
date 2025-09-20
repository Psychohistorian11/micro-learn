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
        ? { create: dto.areas.map((id) => ({ area: { connect: { id } } })) }
        : undefined,
      communities: dto.communities
        ? {
            create: dto.communities.map((id) => ({
              community: { connect: { id } },
            })),
          }
        : undefined,
    },
    select: resourceSelect,
  });

  return NextResponse.json(newResource);
}

export async function PUT(request: NextRequest) {
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

  const updatedResource = await prismadb.$transaction(async (tx) => {
    //FINALBOSS_TODO: Esto podría mejorar, comparando con el objeto existente y solo haciendo cambios si es necesario
    // Borrar relaciones viejas
    await tx.resource_Area.deleteMany({ where: { resourceId: dto.id } });
    await tx.resource_Community.deleteMany({ where: { resourceId: dto.id } });

    // Recrear relaciones
    if (dto.areas?.length) {
      await tx.resource_Area.createMany({
        data: dto.areas.map((areaId) => ({
          resourceId: dto.id,
          areaId,
        })),
      });
    }

    if (dto.communities?.length) {
      await tx.resource_Community.createMany({
        data: dto.communities.map((communityId) => ({
          resourceId: dto.id,
          communityId,
        })),
      });
    }

    // Actualizar el recurso en sí
    return tx.resource.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        description: dto.description,
        isPublic: dto.isPublic,
        image: dto.image,
        attachment: dto.attachment,
        type: dto.type,
      },
      include: {
        areas: { include: { area: true } },
        communities: { include: { community: true } },
      },
    });
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