import React from "react";
import { useUser } from "../contexts";
import UserManagement from "../components/UserManagement";

const UsersPage: React.FC = () => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Please log in to continue</p>
      </div>
    );
  }

  return (
    <>
      <UserManagement />
    </>
  );
};

export default UsersPage;
