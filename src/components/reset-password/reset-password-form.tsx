"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { verifyOTP } from "@/lib/otp-actions";
import { redirect } from "next/navigation";
import ResetPasswordNewPasswordForm from "./reset-password-new-password-form";
import ResetPasswordOtpForm from "./reset-password-otp-form";
import ResetPasswordEmailForm from "./reset-password-email-form";

export default function ResetPasswordForm() {
  const [otpStep, setOtpStep] = useState(false);
  const [passwordResetStep, setPasswordResetStep] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();

  // Paso 1: correo
  const onSubmitMail = handleSubmit(async (data) => {
    const response = await fetch("/api/user/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) setOtpStep(true);
  });

  // Paso 2: OTP
  const onSubmitOTP = async (data: any) => {
    const response = await verifyOTP(data.email, data.otp);
    console.log("response", response);
    if (response) {
      setPasswordResetStep(true);
    } else {
      // 👇 mostramos error en el campo otp si es inválido
      setError("otp", {
        type: "manual",
        message: "El código OTP es inválido o ha expirado",
      });
    }
  };

  // Paso 3: Nueva contraseña
  const onSubmitPassword = handleSubmit(async (data) => {
    const response = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        newPassword: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (
        result.error === "La nueva contraseña no puede ser igual a la anterior"
      ) {
        setError("password", {
          type: "manual",
          message: result.error,
        });
      } else {
        console.log("Otro error:", result.error);
      }
    } else {
      console.log("Contraseña cambiada correctamente");
      redirect("/login");
    }
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <main className="flex-1 items-center justify-center flex flex-col gap-2">
        <div className="pr-10 pl-10">
          <div className="text-3xl font-serif text-center py-8">
            <p>Bienvenido de vuelta</p>
            <a className="text-persian-green">MicroLearn</a>
          </div>

          {/* Texto dinámico */}
          <div className="text-sm text-center">
            {!otpStep && !passwordResetStep && (
              <p>
                Ingresa tu correo electrónico para restablecer tu contraseña.
              </p>
            )}
            {otpStep && !passwordResetStep && (
              <p>
                Revisa tu correo y escribe el código OTP que te enviamos para
                continuar con el cambio de contraseña.
              </p>
            )}
            {passwordResetStep && (
              <p>Ingresa tu nueva contraseña y confírmala para finalizar.</p>
            )}
          </div>
        </div>

        <div className="mt-4 items-center flex flex-col justify-center w-full px-10">
          {!otpStep && !passwordResetStep && (
            <ResetPasswordEmailForm
              register={register}
              errors={errors}
              onSubmitMail={onSubmitMail}
            />
          )}

          {otpStep && !passwordResetStep && (
            <ResetPasswordOtpForm
              onSubmitOTP={onSubmitOTP}
              control={control} // 👈 nuevo
              handleSubmit={handleSubmit}
              errors={errors}
            />
          )}

          {passwordResetStep && (
            <ResetPasswordNewPasswordForm
              register={register}
              errors={errors}
              onSubmitPassword={onSubmitPassword}
            />
          )}
        </div>
      </main>
    </div>
  );
}
