import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardPage from "@/components/Dashboard/DashboardPage";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SkeletonLoader from "@/components/Dashboard/DashboardLoader";

const page = async () => {
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
      <DashboardPage
        user={{
          fullName: user?.fullName as string,
        }}
      />
    </Suspense>
  );
};

export default page;
