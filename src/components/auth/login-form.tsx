"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import User from "@/interface/user";
import FieldError from "../ui/custom/field-error";
import SignInGoogleButton from "./signin-google-button";

export default function LogInForm() {

    const router = useRouter();
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {

        const dataToSend: User = {
            email: data.email,
            password: data.password
        }

        try {
            const response = await fetch("api/auth/login", {
                method: "GET",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                router.push("home")
            } else {
                const error = await response.json()
                if (error.message === "credenciales invalidas") {
                    setServerError(error.message)
                } else {
                    setServerError("Something went wrong. Please try again.");
                }
            }

        } catch (error) {
            setServerError("Failed to connect to the server.");
        }
    })

    return (
        <div className="flex flex-col gap-4 h-full">
            <header className=" flex gap-2 items-center justify-end">
                <p className="text-xs">
                    ¿No tienes una cuenta?
                </p>
                <Link href="/signup">
                    <Button variant="secondary" size="sm" className="text-sm font-semibold cursor-pointer">Crear</Button>
                </Link>

                <ModeToggle />

            </header>

            <main className=" flex-1 items-center justify-center flex flex-col gap-2">
                <div className="pr-10 pl-10">
                    <div className="text-3xl font-serif text-center ">
                        <p>Inicia sesión en <a className="text-persian-green">MicroLearn</a> </p>
                    </div>
                    <div className="text-sm text-center mt-2">
                        Bienvenido a MicroLearn, por favor ingresa tus datos de acceso para usar la aplicación.
                    </div>
                </div>

                <div className="mt-4 items-center flex flex-col justify-center w-full p-10 " >
                    <form onSubmit={onSubmit} className=" w-full items-center flex flex-col justify-center">
                        <div className="gap-2 flex flex-col w-full">
                            <Input
                                placeholder="Correo electrónico"
                                id="email"
                                type="email"
                                className="w-full placeholder:text-sm"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "email is required",
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
                                        message: "password is required",
                                    },
                                })}
                            />
                            <FieldError errors={errors} field="password" />

                        </div>
                        <div>
                            <Button variant="link" className="text-xs mt-2 mb-2 text-persian-green cursor-pointer" >¿Olvidaste tu contraseña?</Button>
                        </div>
                        <div className="w-full">
                            <Button type="submit" className="w-full bg-persian-green cursor-pointer" size="sm">Iniciar sesión</Button>
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
                        <div className="flex-grow border-t border border-gray-200 dark:border-gray-800 "></div>
                    </div>

                    <SignInGoogleButton />
                </div>



            </main>
        </div>

    )
}