import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  const isLogin = !!session;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen max-h-[1000px] flex justify-center items-center">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="text-xl font-bold mb-2 md:text-5xl lg:text-6xl xl:text-7xl">
          <h1>Organize Your Activity and</h1>
          <h1>Organize Your Life</h1>
        </div>
        <p className="text-sm text-gray-300 mb-3 md:text-base md:mb-5 lg:text-xl lg:mb-7 xl:text-2xl">
          Boost your productivity with our intuitive app. Change your life and
          never miss a deadline again!
        </p>
        <Link
          href={isLogin ? "/dashboard" : "/register"}
          className="bg-white text-purple-600 font-bold text-xs p-[6px] px-3 rounded-full hover:bg-gray-400 transition duration-300 md:text-base md:px-4 md:p-2 lg:text-xl lg:px-5 lg:p-3 xl:text-2xl xl:px-6 xl:p-4"
        >
          {isLogin ? "Go to Dashboard" : "Get Started"}
        </Link>
      </div>
    </div>
  );
};

export default page;
