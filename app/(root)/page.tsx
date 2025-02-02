import React from "react";
import Link from "next/link";

const page = async () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex justify-center items-center">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="text-4xl md:text-6xl font-bold mb-4">
          <h1>Organize Your Activity and</h1>
          <h1>Organize Your Life</h1>
        </div>
        <p className="text-xl md:text-2xl mb-8">
          Boost your productivity with our intuitive app. Change your life and
          never miss a deadline again!
        </p>
        <Link
          href="/register"
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-400 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default page;
