import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import UserDescription from "@/components/profile/userDescription";
import { EditProfileDialogForm } from "@/components/profile/editProfileDialog-form";
import { AvatarEditable } from "@/components/profile/avatarEditable";
import { auth } from "../../../../../auth";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return <p className="text-center text-gray-500">No hay sesión activa</p>;
  }

  let userData: any = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/username/${params.username}`, // 👈 endpoint nuevo
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (response.ok) {
      userData = await response.json();
    } else {
      return <p className="text-center text-red-500">Error al cargar perfil</p>;
    }
  } catch {
    return <p className="text-center text-red-500">Error de conexión</p>;
  }

  const isOwner = session.user.name == params.username;

  return (
    <>
      <ModeToggle />
      <div className="relative max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-xl shadow-md flex items-center gap-6">
        {isOwner ? (
          <>
            <EditProfileDialogForm user={userData} />
            <AvatarEditable user={userData} />
          </>
        ) : (
          <Avatar className="h-28 w-28 rounded-lg">
            <AvatarImage
              src={userData?.profilePicture ?? undefined}
              alt={userData?.name ?? "User"}
            />
            <AvatarFallback className="rounded-lg text-lg font-bold">
              {userData?.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900">
            {userData?.username}
          </h2>
          <p className="text-gray-600">{userData?.email}</p>
          <UserDescription description={userData?.description} />
        </div>
      </div>
    </>
  );
}
