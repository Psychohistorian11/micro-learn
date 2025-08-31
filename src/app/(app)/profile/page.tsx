import SignOutGoogleButton from "@/components/auth/signuot-google-button";
import { auth } from "../../../../auth";

const ProfilePage = async () => {
    const session = await auth();
    console.log("full session: ", session)

    return (
        <>

            <div className="p-6">
                <h1 className="text-2xl font-bold">Profile</h1>
            </div>
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

export default ProfilePage;