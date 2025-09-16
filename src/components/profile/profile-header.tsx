"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileDialogForm } from "@/components/profile/edit-profile-dialog-form";
import { AvatarEditable } from "@/components/profile/avatar-editable";

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
    <div className="w-full rounde bg-card shadow-sm p-6 flex flex-col sm:flex-row gap-6 ">
      <div className="shrink-0 w-full sm:w-auto">
        {isOwner ? (
          <AvatarEditable user={user} />
        ) : (
          <div className="w-full sm:w-30 h-30 mx-auto">
            <Avatar className=" rounded-lg w-full h-full">
              <AvatarImage className="w-full h-full"
                src={user.profilePicture ?? undefined}
                alt={user.username ?? "User"}
              />
              <AvatarFallback className="rounded-xl text-lg font-serif w-full">
                {user.username?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

        )}
      </div>

      <div className="flex-1 min-w-0  ">
        <div className="flex items-start justify-between ">
          <div className="min-w-0">
            <h1 className="text-2xl font-serif leading-tight truncate">
              {user.username ?? "usuario"}
            </h1>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          {isOwner && (
            <div className="relative self-start -mt-4">
              <EditProfileDialogForm user={user} />
            </div>
          )}
        </div>

        {user.description && (
          <div className="mt-3 text-sm text-muted-foreground">
            <p className="whitespace-pre-line">{user.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
