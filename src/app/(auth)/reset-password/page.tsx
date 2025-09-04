import ResetPasswordForm from "@/components/reset-password/reset-password-form";

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex flex-row">
      <div className=" md:basis-2/3 hidden md:block pl-6 pt-6 pb-6 ">
        <div className="dark:bg-white bg-black h-full rounded-lg flex flex-col justify-center items-center">
          <p className="dark:text-black text-white">Background image</p>
        </div>
      </div>
      <div className=" md:basis-1/3 w-full p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
