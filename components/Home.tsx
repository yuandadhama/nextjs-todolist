"use client";

import Link from "next/link";
import { useState } from "react";

const DirectButton = ({ isLogin }: { isLogin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button className="bg-white text-purple-600 font-bold text-xs p-[6px] px-3 rounded-full shadow-lg hover:bg-gray-400 transition duration-300 sm:text-sm md:text-base md:py-3 lg:text-xl lg:px-5 lg:p-3 xl:text-2xl xl:px-6 xl:p-4">
      <Link
        href={isLogin ? "/dashboard/todos" : "/register"}
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? ". . ." : isLogin ? "Go to Dashboard" : "Get Started"}
      </Link>
    </button>
  );
};

export default DirectButton;
