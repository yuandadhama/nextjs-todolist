import React from "react";

// Define user type
interface UserProps {
  user: {
    fullName: string;
  };
}

const DashboardHeader: React.FC<UserProps> = ({ user }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Dashboard</h1>
      <h2 className="text-base text-gray-500 font-semibold mb-2 leading-3">
        Welcome to your dashboard,{" "}
        <span className="text-blue-500 text-lg">{user.fullName}</span>
      </h2>
      <p className="text-gray-500 text-sm">
        Here you can manage your tasks, view your progress, and stay organized.
      </p>
    </>
  );
};

export default DashboardHeader;
