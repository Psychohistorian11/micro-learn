import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // usa "contraseña de aplicación", no tu pass real
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  const subject = "Tu código de verificación - MicroLearn";
  const text = `Tu código de verificación es: ${otp}. Tiene una validez de 5 minutos.`;

  const html = `
  <div style="background-color:#131515; padding:40px; font-family:Arial, sans-serif; color:#fffafb;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background:#2b2c28; border-radius:12px; overflow:hidden;">
      <tr>
        <td style="padding:20px; text-align:center; background-color:#339989; color:#fffafb; font-size:22px; font-weight:bold; font-family:Arial, sans-serif;">
          MicroLearn
        </td>
      </tr>
      <tr>
        <td style="padding:30px; text-align:center; color:#fffafb;">
          <h2 style="margin:0 0 20px; font-size:20px;">Código de verificación</h2>
          <p style="margin:0 0 30px; font-size:16px; color:#fffafb;">
            Usa el siguiente código para continuar con tu proceso de seguridad. 
            Este código expira en 5 minutos.
          </p>
          <div style="display:inline-block; padding:15px 30px; background:#339989; color:#fffafb; border-radius:8px; font-size:24px; font-weight:bold; letter-spacing:4px;">
            ${otp}
          </div>
          <p style="margin-top:30px; font-size:14px; color:#fffafb;">
            Si no solicitaste este código, puedes ignorar este correo.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:15px; text-align:center; background:#131515; font-size:12px; color:#fffafb;">
          © ${new Date().getFullYear()} MicroLearn. Todos los derechos reservados.
        </td>
      </tr>
    </table>
  </div>
  `;

  await transporter.sendMail({
    from: `"MicroLearn" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
