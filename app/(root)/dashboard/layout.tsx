import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import SkeletonLoader from "@/components/Dashboard/DashboardLoader";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import NavLinks from "@/components/Dashboard/NavLinks";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

const page = async ({ children }: Readonly<{ children: ReactNode }>) => {
  // Get the session from the server
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    console.log("Session not found");
    redirect("/login");
  }

  // Connect to MongoDB
  await connectDB();

  // Fetch user data from the database
  const user = await User.findById(session?.user.id).select("fullName");

  if (!user) {
    console.log("User not found");
    redirect("/login");
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-auto flex flex-col items-center md:flex-row md:px-7 justify-center">
        <div className="mt-24 md:mt-28 px-4 flex flex-col mb-10 sm:mb-14 md:w-screen xl:max-w-[1440px]">
          <div className="w-full bg-white rounded-lg shadow-md p-4 mb-5 md:mb-8 md:w-2/3 lg:w-1/2">
            <DashboardHeader user={user} />
          </div>
          <div className="w-auto rounded-lg shadow-md text-gray-800 md:w-full">
            <div className="flex flex-row md:justify-start">
              <NavLinks />
            </div>
            <div className="w-full bg-white shadow-md rounded-b-md md:rounded-tr-md p-3 text-gray-800 h-auto pt-5 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
