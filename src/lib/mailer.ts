import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // usa "contraseña de aplicación", no tu pass real
  },
});

export async function sendMail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  await transporter.sendMail({
    from: `"MicroLearn" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
