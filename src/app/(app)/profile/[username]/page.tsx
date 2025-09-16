// app/(app)/profile/[username]/page.tsx
import { Suspense } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileSkeleton, ResourceListSkeleton } from "@/components/profile/profile-skeleton";
import { auth } from "../../../../../auth";
import { ResourceList } from "@/components/resource/resource-list";

async function ProfileContent({
  username,
  session,
}: {
  username: string;
  session: any;
}) {
  // 1) Traer usuario por username
  const userRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/username/${encodeURIComponent(
      username
    )}`,
    { cache: "no-store", headers: { "Content-Type": "application/json" } }
  );

  if (!userRes.ok) {
    return (
      <div className="p-6 flex flex-col justify-center items-center h-full">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-serif text-destructive mb-2">Usuario no encontrado</h2>
          <p >El usuario que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

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
    <div className="flex flex-col sm:items-start w-full max-w-3xl h-full gap-4 ">
      <ProfileHeader user={user} isOwner={isOwner} />
      <ResourceList resources={resources} isOwner={isOwner} />
    </div>
  );
}


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth();
  const { username } = await params;

  return (
    <div className="p-6 flex flex-col justify-center items-center h-full">
      <Suspense
        fallback={
          <div className="flex flex-col  w-full max-w-3xl h-full gap-4">
            <ProfileSkeleton />
            <ResourceListSkeleton />
          </div>
        }
      >
        <ProfileContent username={username} session={session} />
      </Suspense>
    </div>
  );
}
