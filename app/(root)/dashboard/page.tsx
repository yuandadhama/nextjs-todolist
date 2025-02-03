"use server";

import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

const getUser = async () => {
  try {
    const response = await fetch(process.env.URL + "/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { success, message, fullName, username } = await response.json();

    if (!success) {
      console.error(message);
      redirect("/login");
    }

    return {
      fullName,
      username,
    };
  } catch (err) {
    console.error("something went wrong", err);
    redirect("/login");
  }
};

const DashboardPage = async () => {
  const { fullName, username } = await getUser();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex flex-col items-center p-8">
      <div className="mt-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 text-gray-800">
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
    </div>
  );
};

export default DashboardPage;
