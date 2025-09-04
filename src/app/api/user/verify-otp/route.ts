import { verifyOTP } from "@/lib/otp-actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, code } = await req.json();
  if (!email || !code) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

  const isValid = verifyOTP(email, code);

  if (!isValid) return NextResponse.json({ error: "OTP inválido o expirado" }, { status: 400 });

  return NextResponse.json({ message: "OTP válido" });
}
