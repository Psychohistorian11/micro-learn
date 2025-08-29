import SignOutGoogleButton from "@/components/auth/signuot-google-button";
import { auth } from "../../../auth";
import ProfilePictureUploader from "@/components/profile/ProfilePicture";

const HomePage = async () => {
    const session = await auth();

    return (
        <>
            <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
                <p className="text-gray-600">Signed in as:</p>
                <p className="font-medium text-black">{session?.user?.email}</p>
                <p className="text-black">eoooooo: {session?.user?.id}</p>
            </div>
                        <div>
            <div className="mb-10">
                <ProfilePictureUploader userId={session?.user?.id!} />
            </div>
            </div>
            <div>
                <SignOutGoogleButton />
            </div>

        </>
    );
};

export default HomePage;