import { redirect } from "next/navigation";

const Page = async () => {
  redirect("/dashboard/overview");
  return null; // This prevents rendering anything after the redirect
};

export default Page;
