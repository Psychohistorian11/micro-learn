import LogInForm from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-screen  flex flex-row">
            <div className=" md:basis-2/3 hidden md:block pl-6 pt-6 pb-6 ">
                <div className="dark:bg-white bg-black h-full rounded-lg flex flex-col justify-center items-center">
                    <p className="dark:text-black text-white">Background image</p>
                </div>

            </div>
            {/*falta incluir el padding del padre: cuando el hijo este listo */}
            <div className=" md:basis-1/3 w-full p-8">
                <LogInForm />
            </div>
        </div>
    );
}   
