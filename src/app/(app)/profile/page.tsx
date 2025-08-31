import SignOutGoogleButton from "@/components/auth/signuot-google-button";
<<<<<<< HEAD:src/app/(app)/profile/page.tsx
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
=======
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
>>>>>>> resources:src/app/home/page.tsx

      <ProfileButtons userId={session?.user?.id!} />
      <ResourceButton userId={session?.user?.id!} />

      <div className="flex justify-center">
        <SignOutGoogleButton />
        <CreateResource userId={session?.user?.id!} />
      </div>
    </>
  );
};

<<<<<<< HEAD:src/app/(app)/profile/page.tsx
export default ProfilePage;
=======
export default HomePage;
>>>>>>> resources:src/app/home/page.tsx
