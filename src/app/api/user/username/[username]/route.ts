import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { userSelect } from "@/lib/prisma-selects";

export async function GET(request: Request, context: any) {
  const { username } = (await context.params) as { username: string };

  const user = await prismadb.user.findUnique({
    where: { username: username },
    select: userSelect,
  });
  if (!user) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
