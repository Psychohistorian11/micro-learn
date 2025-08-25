import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function LogInForm() {

    return (
        <div className="flex flex-col gap-4 h-full border border-white">
            <header className=" flex gap-2 items-center justify-end border border-amber-500">
                <p className="text-xs">
                    ¿No tienes una cuenta?
                </p>
                <Link href="/signup">
                    <Button variant="secondary" size="sm" className="text-sm font-semibold cursor-pointer">Crear</Button>
                </Link>

                <ModeToggle />


            </header>

            <main className=" flex-1 items-center justify-center flex flex-col gap-2 border border-green-500">
                <div className="pr-10 pl-10">
                    <div className="text-3xl font-serif text-center ">
                        <p>Inicia sesión en <a className="text-persian-green">MicroLearn</a> </p>
                    </div>
                    <div className="text-sm text-center mt-2">
                        Bienvenido a MicroLearn, por favor ingresa tus datos de acceso para usar la aplicación.
                    </div>
                </div>

                <div className="mt-4 items-center flex flex-col justify-center w-full p-10 border border-blue-500" >
                    <div className="gap-2 flex flex-col w-full">
                        <Input placeholder="Correo electrónico" type="email" className="w-full placeholder:text-sm" />
                        <Input placeholder="Contraseña" type="password" className="w-full placeholder:text-sm" />
                    </div>
                    <div>
                        <Button variant="link" className="text-xs mt-2 mb-2 text-persian-green cursor-pointer" >¿Olvidaste tu contraseña?</Button>
                    </div>
                    <div className="w-full">
                        <Button className="w-full bg-persian-green cursor-pointer" size="sm">Iniciar sesión</Button>
                    </div>

                    <div className="flex items-center my-4 w-full mt-4 mb-4">
                        <div className="flex-grow border-t border border-gray dark:border-white"></div>
                        <span className="mx-2 text-xs">O</span>
                        <div className="flex-grow border-t border border-gray-300 dark:border-white"></div>
                    </div>

                    <div className="text-center w-full">
                        <Button className="w-full cursor-pointer text-sm" size="sm" variant="outline">
                            <IconBrandGoogleFilled className="mr-2 h-4 " />
                            Continuar con Google
                        </Button>
                    </div>
                </div>



            </main>
        </div>

    )
}