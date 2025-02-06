import User from "@/models/User";
import HeaderClient from "./Header/HeaderClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";

const Header = async () => {
  const session = await getServerSession(authOptions);
  await connectDB();

  // Fetch user data from the database
  const user = await User.findById(session?.user.id).select("username");

  const isLogin = !!session;
  return <HeaderClient username={user?.username as string} isLogin={isLogin} />;
};

export default Header;
