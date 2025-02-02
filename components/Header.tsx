"use client";

import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${
        isScrolled ? "bg-blue-500 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-center">
        <div className="flex justify-between items-center w-full container">
          <h1 className="text-white text-3xl font-semibold">TodoList App</h1>

          <div className="flex gap-3">
            <Link
              href={"/register"}
              className=" text-white hover:text-gray-400 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
            >
              <span>Register</span>
            </Link>
            <Link
              href={"/login"}
              className="bg-white text-blue-500 hover:bg-blue-200 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center">
                <span>Login</span>
                <span>
                  <ChevronDoubleRightIcon className="w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
