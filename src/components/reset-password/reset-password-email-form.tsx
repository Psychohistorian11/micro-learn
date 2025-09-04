"use client";

import { Button } from "../ui/button";
import FieldError from "../ui/custom/field-error";
import { Input } from "../ui/input";

export default function ResetPasswordEmailForm({
  register,
  errors,
  onSubmitMail,
}: any) {
  return (
    <form
      onSubmit={onSubmitMail}
      className="w-full items-center flex flex-col justify-center"
    >
      <div className="flex flex-col w-full gap-2">
        <Input
          placeholder="Correo electrónico"
          id="email"
          type="email"
          className="w-full placeholder:text-sm"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex simple para email
              message: "El correo electrónico no es válido",
            },
          })}
        />
        <FieldError errors={errors} field="email" />

        <div className="w-full mt-3">
          <Button
            type="submit"
            className="w-full bg-persian-green cursor-pointer"
            size="sm"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
