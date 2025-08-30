import SignOutGoogleButton from "@/components/auth/signuot-google-button";
import { auth } from "../../../auth";

const HomePage = async () => {
    const session = await auth();
    console.log("full session: ", session)

    return (
        <>
            <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
                <p className="text-gray-600">Signed in as:</p>
                <p className="font-medium text-black">{session?.user?.email}</p>
                <p className="text-black">eoooooo: {session?.user?.id}</p>
            </div>
            <div>
                <SignOutGoogleButton />
            </div>

        </>
    );
};

export default HomePage;