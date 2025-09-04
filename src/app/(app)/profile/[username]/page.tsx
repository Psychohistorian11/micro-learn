// app/(app)/profile/[username]/page.tsx
import { ProfileHeader } from "@/components/profile/profile-header";
import { auth } from "../../../../../auth";
import { ResourceList } from "@/components/resource/resource-list";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth();
  const { username } = await params;

  // 1) Traer usuario por username
  const userRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/username/${encodeURIComponent(
      username
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

  const isOwner = !!session?.user && session.user.name == username;

  return (
    <div className="p-6 flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-between w-full max-w-3xl h-full  gap-4">
        <ProfileHeader user={user} isOwner={isOwner} />

        <ResourceList resources={resources} />
      </div>
    </div>
  );
}
