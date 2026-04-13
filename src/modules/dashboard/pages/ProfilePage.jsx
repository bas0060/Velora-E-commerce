import React from "react";
import { useGetUserProfile } from "@/api/use-get-user-data";

const ProfilePage = ( ) => {
  const { data: user, isLoading } = useGetUserProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Profile</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your personal information.</p>

      {/* Placeholder content — replace with your actual profile form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-700 text-sm">{`Hello, ${user.username}!`}</p>
        <p className="text-gray-700 text-sm">{`${user.email}!`}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
