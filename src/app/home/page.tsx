import SignOutGoogleButton from "@/components/auth/signuot-google-button";
import { auth } from "../../../auth";
import ProfileButtons from "@/components/profile/profileButtons";
import CreateResource from "@/components/resources/createResource";
import ResourceButton from "@/components/resources/resourcesButton";

const HomePage = async () => {
  const session = await auth();
  console.log("full session: ", session);

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium text-black">{session?.user?.email}</p>
        <p className="text-black">User ID: {session?.user?.id}</p>
      </div>

      <ProfileButtons userId={session?.user?.id!} />
      <ResourceButton userId={session?.user?.id!} />

      <div className="flex justify-center">
        <SignOutGoogleButton />
        <CreateResource userId={session?.user?.id!} />
      </div>
    </>
  );
};

export default HomePage;
