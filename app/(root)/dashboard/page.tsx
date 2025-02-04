"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { redirect } from "next/navigation";

// const getUser = async () => {
//   await connectDB();

//   const token = (await cookies()).get("token")?.value;
//   if (!token) {
//     redirect("/login");
//     return;
//   }

//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as any;
//     const user = await User.findById(payload.userId);

//     if (!user) {
//       throw new Error("Invalid token, user not found, error when getting user");
//     }

//     return {
//       fullName: user.fullName,
//       username: user.username,
//     };
//   } catch (error) {
//     console.error("something went wrong:", error);
//     redirect("/login");
//   }
// };

const DashboardPage = () => {
  const { user, loading } = useAuth();
  if (!user) redirect("/login");

  const { fullName } = user;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex flex-col items-center p-8">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-32">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 text-gray-800">
            <h1 className="text-4xl font-bold mb-8 text-gray-700">Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to your Dashboard,{" "}
              <span className="text-blue-500">{fullName}</span>
            </h2>
            <p className="mb-6">
              Here you can manage your tasks, view your progress, and stay
              organized.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Your Tasks</h3>
                <p>View and manage your tasks here.</p>
                <Link href="/dashboard/todolist">
                  <p className="text-blue-500 hover:text-blue-700 underline mt-2 inline-block">
                    Go to Tasks
                  </p>
                </Link>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Profile</h3>
                <p>Update your profile information.</p>
                <Link href="/profile">
                  <p className="text-blue-500 hover:text-blue-700 underline mt-2 inline-block">
                    Go to Profile
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
