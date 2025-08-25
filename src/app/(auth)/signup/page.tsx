import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
    return (
        <div className="flex justify-center min-h-screen border border-pink-500">
            <div className=" flex p-8 border border-blue-500 md:w-1/3 item justify-center">
                <SignUpForm />
            </div>

        </div>
    );
}   