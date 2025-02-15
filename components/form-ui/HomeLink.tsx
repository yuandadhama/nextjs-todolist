import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const HomeLink = () => {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center hover:text-gray-400 transition-all duration-300 ease-out mb-4 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl"
    >
      <ArrowLeftCircleIcon className="w-4 md:w-5 lg:w-6 xl:w-7" />
      <p>Home</p>
    </Link>
  );
};

export default HomeLink;
