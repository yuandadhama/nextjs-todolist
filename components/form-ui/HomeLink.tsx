import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const HomeLink = () => {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center hover:text-gray-400 transition-all duration-300 ease-out mb-10"
    >
      <ArrowLeftCircleIcon className="w-4" />
      <p>Home</p>
    </Link>
  );
};

export default HomeLink;
