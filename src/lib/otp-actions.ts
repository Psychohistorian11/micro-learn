"use server";

import prisma from "./prismadb";

export async function generateOTP(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

  await prisma.otpCode.create({
    data: { email, code, expiresAt },
  });

  return code;
}

export async function verifyOTP(email: string, code: string) {
  console.log("email", email);
  console.log("code", code);
  const record = await prisma.otpCode.findFirst({
    where: { email, code, used: false, expiresAt: { gt: new Date() } },
  });

  if (!record) return false;

  await prisma.otpCode.update({
    where: { id: record.id },
    data: { used: true },
  });

  return true;
}
