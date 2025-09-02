// app/(app)/profile/[username]/page.tsx
import { ProfileHeader } from "@/components/profile/profileHeader";
import { auth } from "../../../../../auth";
import { ResourceList } from "@/components/resources/resourceList";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  // 1) Traer usuario por username
  const userRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/username/${encodeURIComponent(
      params.username
    )}`,
    { cache: "no-store", headers: { "Content-Type": "application/json" } }
  );
  if (!userRes.ok) return <p className="p-6">Usuario no encontrado</p>;
  const user = await userRes.json();

  // 2) Traer recursos del autor
  const resourcesRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${encodeURIComponent(
      user.id
    )}/resources`,
    { cache: "no-store", headers: { "Content-Type": "application/json" } }
  );
  const resources: [] = resourcesRes.ok ? await resourcesRes.json() : [];

  const isOwner = !!session?.user && session.user.name == params.username;

  return (
    <div className="p-6 flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-between w-full max-w-3xl h-full p-4 gap-4">
        <ProfileHeader user={user} isOwner={isOwner} />

        <ResourceList resources={resources} />
      </div>
    </div>
  );
}
