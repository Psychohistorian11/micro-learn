import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mailer";
import { generateOTP } from "@/lib/otp-actions";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const code = await generateOTP(email);

  await sendOTPEmail(email, code);

  return NextResponse.json({ message: "OTP enviado al correo" });
}
