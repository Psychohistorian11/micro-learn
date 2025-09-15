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


export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingResource = await prismadb.resource.findUnique({
      where: { id: params.id },
    });

    if (!existingResource) {
      return NextResponse.json(
        { message: "Resource not found" },
        { status: 404 }
      );
    }

    await prismadb.resource.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { message: "Error deleting resource" },
      { status: 500 }
    );
  }
}


