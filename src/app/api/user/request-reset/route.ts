import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { generateOTP } from "@/lib/otp-actions";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const code = await generateOTP(email);

  await sendMail(
    email,
    "Código de recuperación de contraseña",
    `Tu código OTP es: ${code}`,
    `<p>Tu código OTP es: <b>${code}</b></p>`
  );

  return NextResponse.json({ message: "OTP enviado al correo" });
}
