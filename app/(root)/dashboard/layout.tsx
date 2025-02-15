import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import SkeletonLoader from "@/components/Dashboard/DashboardLoader";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import NavLinks from "@/components/Dashboard/NavLinks";

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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-auto flex flex-col items-center p-3 md:flex-row">
        <div className="mt-24 flex flex-col mb-10">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 text-gray-800 mb-5">
            <DashboardHeader user={user} />
          </div>
          <div className="w-full max-w-4xl rounded-lg shadow-md text-gray-800">
            <div className="flex flex-row">
              <NavLinks />
            </div>
            <div className="w-full bg-white shadow-md rounded-b-md p-3 text-gray-800 h-[500px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
