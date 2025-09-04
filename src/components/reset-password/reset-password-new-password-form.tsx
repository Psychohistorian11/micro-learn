"use client";

import { Button } from "../ui/button";
import FieldError from "../ui/custom/field-error";
import { Input } from "../ui/input";

export default function ResetPasswordNewPasswordForm({
  register,
  errors,
  onSubmitPassword,
}: any) {
  return (
    <form
      onSubmit={onSubmitPassword}
      className="w-full items-center flex flex-col justify-center"
    >
      <div className="flex flex-col w-full gap-2">
        <Input
          placeholder="Nueva contraseña"
          id="password"
          type="password"
          className="w-full placeholder:text-sm"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        <FieldError errors={errors} field="password" />

        <Input
          placeholder="Confirmar contraseña"
          id="confirmPassword"
          type="password"
          className="w-full placeholder:text-sm"
          {...register("confirmPassword", {
            required: "Debes confirmar tu contraseña",
            validate: (value: any, formValues: { password: any }) =>
              value === formValues.password || "Las contraseñas no coinciden",
          })}
        />
        <FieldError errors={errors} field="confirmPassword" />

        <div className="w-full mt-3">
          <Button
            type="submit"
            className="w-full bg-persian-green cursor-pointer"
            size="sm"
          >
            Cambiar contraseña
          </Button>
        </div>
      </div>
    </form>
  );
}
