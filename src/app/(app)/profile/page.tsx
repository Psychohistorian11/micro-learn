// app/(app)/profile/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function MyProfileRedirect() {
  const session = await auth();
  redirect(`/profile/${session?.user?.name || 'usuario'}`);
}
