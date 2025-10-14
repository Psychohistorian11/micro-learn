import { CommunityResourcesCreateDTO } from "@/interface/community-resources";
import { resourceBaseSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

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

  const convertedList = await Promise.all(
    postedResources.map(async (item) => {
      const user = await prismadb.user.findUnique({
        where: { id: item.resource.authorId },
        select: { username: true },
      });
      return { ...item.resource, authorName: user?.username };
    })
  );

  return NextResponse.json(convertedList);
}
