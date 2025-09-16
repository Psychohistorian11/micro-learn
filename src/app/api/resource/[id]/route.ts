import { resourceSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = (await context.params) as { id: string };

  const resource = await prismadb.resource.findUnique({
    where: { id: id },
    select: resourceSelect,
  });

  if (!resource) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(resource);
}

export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params as { id: string };

  const resource = await prismadb.resource.delete({
    where: { id: id },
    select: resourceSelect,
  });

  if (!resource) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(resource);
}
