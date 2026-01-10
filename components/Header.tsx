import HeaderClient from "./Header/HeaderClient";
import { getCurrentUser } from "@/actions/getUser";

const Header = async () => {
  // Fetch user data from the database
  const user = await getCurrentUser();
  const isLogin = !!user;
  return <HeaderClient username={user?.username as string} isLogin={isLogin} />;
};

export default Header;
