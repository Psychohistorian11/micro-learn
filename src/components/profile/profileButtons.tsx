"use client";
import { useState } from "react";
import ProfilePictureUploader from "../profile/profilePictureUploader";

const ProfileButtons = ({ userId }: { userId: string }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => setShowProfile(!showProfile)}
        >Perfil
        </button>
      </div>

      {showProfile && (
        <div className="mb-10 flex justify-center">
          <ProfilePictureUploader userId={userId} />
        </div>
      )}
    </>
  );
};

export default ProfileButtons;

