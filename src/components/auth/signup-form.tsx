"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import FieldError from "../ui/custom/field-error";
import { UserCreateDTO } from "@/interface/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Las contraseñas no coinciden",
        type: "server",
      });
      return;
    }
    const dataToSend: UserCreateDTO = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("login");
      } else {
        const error = await response.json();
        if (error.message === "el nombre de usuario ya esta en uso") {
          setError("username", { type: "server", message: error.message });
        } else if (
          error.message ===
          "el correo electronico ya esta registrado en la aplicación"
        ) {
          setError("email", { type: "server", message: error.message });
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      setServerError("Failed to connect to the server.");
    }
  });

  return (
    <div className="justify-between flex flex-col gap-4">
      <header className="flex gap-2 items-center justify-end">
        <p className="text-xs">¿Ya tienes una cuenta?</p>
        <Link href="/login">
          <Button
            variant="secondary"
            size="sm"
            className="text-sm font-semibold cursor-pointer"
          >
            Iniciar sesión
          </Button>
        </Link>
        <ModeToggle />
      </header>

      <main className="flex-1 items-center justify-center flex flex-col gap-2">
        <div className="px-10">
          <div className="text-3xl font-serif text-center">
            <p>
              Crea tu cuenta en <a className="text-persian-green">MicroLearn</a>
            </p>
          </div>
          <div className="text-sm text-center mt-2">
            Únete a la comunidad educativa y empieza a crear y compartir
            recursos.
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center w-full p-10">
          <form onSubmit={onSubmit}>
            <div className="gap-2 flex flex-col w-full">
              <Input
                placeholder="Nombre de usuario"
                id="username"
                type="text"
                className="w-full placeholder:text-sm"
                {...register("username", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es obligatorio",
                  },
                })}
              />
              <FieldError errors={errors} field="username" />

              <Input
                placeholder="Correo electrónico"
                id="email"
                type="email"
                className="w-full placeholder:text-sm"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es obligatorio",
                  },
                })}
              />
              <FieldError errors={errors} field="email" />

              <Input
                placeholder="Contraseña"
                id="password"
                type="password"
                className="w-full placeholder:text-sm"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
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
                  required: {
                    value: true,
                    message: "La confirmación de la contraseña es obligatoria",
                  },
                })}
              />
              <FieldError errors={errors} field="confirmPassword" />
            </div>

            <div className="w-full mt-4">
              <Button
                type="submit"
                className="w-full bg-persian-green cursor-pointer"
              >
                Registrarme
              </Button>
            </div>
            {serverError && (
              <p className="text-tiffany-blue text-xs text-center mt-2">
                {serverError}
              </p>
            )}
          </form>

          <div className="flex items-center my-4 w-full mt-4 mb-4">
            <div className="flex-grow border-t border border-gray-200 dark:border-gray-800"></div>
            <span className="mx-2 text-xs">O</span>
            <div className="flex-grow border-t border border-gray-200 dark:border-gray-800"></div>
          </div>

          <div className="text-center w-full">
            <Button className="w-full cursor-pointer" variant="outline">
              <IconBrandGoogleFilled className="mr-2 h-4" />
              Continuar con Google
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
