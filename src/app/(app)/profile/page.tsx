import { Button } from "@/components/ui/button";
import { auth } from "../../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import UserDescription from "@/components/profile/userDescription";
import { EditProfileDialogForm } from "@/components/profile/editProfileDialog-form";

export default async function ProfilePage() {
  const session = await auth();
  let userData = undefined;
  if (!session?.user) {
    return <p className="text-center text-gray-500">No hay sesión activa</p>;
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/${session.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      userData = await response.json();
      // Do something with userData
      console.log("userData", userData);
    } else {
      const error = await response.json();
      console.error("Error:", error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <div className="relative max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-xl shadow-md flex items-center gap-6">
      <EditProfileDialogForm user={userData} />
      
      {/* Foto de perfil */}
      <Avatar className="h-28 w-28 rounded-lg">
        <AvatarImage
          src={session.user.image ?? undefined}
          alt={session.user.name ?? "User"}
        />
        <AvatarFallback className="rounded-lg text-lg font-bold">
          {session.user.name?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Info del usuario */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900">
          {session.user.name}
        </h2>
        <p className="text-gray-600">{session.user.email}</p>

        <UserDescription description={userData?.description} />
      </div>
    </div>
  );
}
