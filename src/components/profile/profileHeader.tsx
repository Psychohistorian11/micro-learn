"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileDialogForm } from "@/components/profile/editProfileDialog-form";
import { AvatarEditable } from "@/components/profile/avatarEditable";

type User = {
  id: string;
  username?: string;
  email: string;
  profilePicture?: string;
  description?: string;
  name?: string;
};

export function ProfileHeader({
  user,
  isOwner,
}: {
  user: User;
  isOwner: boolean;
}) {
  return (
    <div className="relative z-0 rounded-2xl border bg-card shadow-sm p-6 flex gap-6 items-start">
      {/* Avatar */}
      <div className="shrink-0">
        {isOwner ? (
          <AvatarEditable user={user} />
        ) : (
          <Avatar className="h-24 w-24 rounded-xl">
            <AvatarImage
              src={user.profilePicture ?? undefined}
              alt={user.username ?? "User"}
            />
            <AvatarFallback className="rounded-xl text-lg font-bold">
              {user.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight truncate">
              {user.username ?? "usuario"}
            </h1>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          {isOwner && (
            <div className="relative">
              <EditProfileDialogForm user={user} />
            </div>
          )}
        </div>

        {/* Descripción */}
        {user.description && (
          <div className="mt-3 text-[15px] text-muted-foreground">
            <p className="whitespace-pre-line">{user.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
