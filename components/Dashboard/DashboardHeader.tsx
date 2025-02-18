import React from "react";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

interface UserProps {
  user: {
    fullName: string;
  };
}

const DashboardHeader: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <ChartBarSquareIcon className="w-10 h-10 text-blue-500 md:w-12 md:h-12" />

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
            Dashboard
          </h1>
          <h2 className="text-base md:text-lg lg:text-xl text-gray-600 font-medium">
            Welcome back,{" "}
            <span className="text-blue-500 font-semibold">{user.fullName}</span>
            !
          </h2>
        </div>
      </div>

      <p className="mt-3 text-gray-500 text-sm md:text-base lg:text-lg">
        Manage your tasks, track progress, and stay productive.
      </p>
    </div>
  );
};

export default DashboardHeader;
