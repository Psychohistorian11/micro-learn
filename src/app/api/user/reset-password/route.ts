import { userSelect } from "@/lib/prisma-selects";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const existingUser = await prismadb.user.findUnique({
    where: { email: email },
    select: { ...userSelect, password: true },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(newPassword, existingUser.password);
  if (isPasswordValid) {
    return NextResponse.json({ error: "La nueva contraseña no puede ser igual a la anterior" }, { status: 400 });
  }

  await prismadb.user.update({
    where: { email: email },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Contraseña actualizada correctamente" });
}
