import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function SignUpForm() {
    return (
        <div className="justify-between flex flex-col gap-4  border border-white ">
            <header className="flex gap-2 items-center justify-end  border border-red-500">
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

            <main className="flex-1 items-center justify-center flex flex-col gap-2 border border-green-500">
                <div className="px-10">
                    <div className="text-3xl font-serif text-center">
                        <p>
                            Crea tu cuenta en{" "}
                            <a className="text-persian-green">MicroLearn</a>
                        </p>
                    </div>
                    <div className="text-sm text-center mt-2">
                        Únete a la comunidad educativa y empieza a crear y compartir
                        recursos.
                    </div>
                </div>

                <div className="mt-6 flex flex-col justify-center w-full p-10 border border-yellow-500">
                    <div className="gap-2 flex flex-col w-full">
                        <Input
                            placeholder="Nombre completo"
                            type="text"
                            className="w-full placeholder:text-sm"
                        />
                        <Input
                            placeholder="Correo electrónico"
                            type="email"
                            className="w-full placeholder:text-sm"
                        />
                        <Input
                            placeholder="Contraseña"
                            type="password"
                            className="w-full placeholder:text-sm"
                        />
                        <Input
                            placeholder="Confirmar contraseña"
                            type="password"
                            className="w-full placeholder:text-sm"
                        />
                    </div>

                    <div className="w-full mt-4">
                        <Button className="w-full bg-persian-green cursor-pointer">
                            Registrarme
                        </Button>
                    </div>

                    <div className="flex items-center my-4 w-full mt-6 mb-4">
                        <div className="flex-grow border-t border border-gray-300 dark:border-white"></div>
                        <span className="mx-2 text-xs">O</span>
                        <div className="flex-grow border-t border border-gray-300 dark:border-white"></div>
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
