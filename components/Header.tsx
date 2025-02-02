import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-blue-400 flex p-3 justify-between items-center fixed w-screen">
      <h1 className="text-white text-4xl font-bold">TodoList App</h1>

      <div className="flex gap-3">
        <Link
          href={"/signup"}
          className="bg-white text-blue-500 hover:bg-blue-200 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
        >
          Sign Up
        </Link>
        <Link
          href={"/login"}
          className="bg-white text-blue-500 hover:bg-blue-200 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
