"use client";

import {
  ArrowRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useAuth } from "@/app/contexts/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLogin, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboard = pathname === "/dashboard";

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
          <h1 className="text-white text-3xl font-semibold">
            {isDashboard && isLogin ? user?.username : "TodoList App"}
          </h1>

          <div className="flex gap-3">
            {isLogin && isDashboard ? (
              <button
                onClick={logout}
                className="bg-white text-blue-500 hover:bg-blue-200 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center gap-2">
                  <span>Logout</span>
                  <ArrowRightIcon className="w-4" />
                </div>
              </button>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-white hover:text-gray-400 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-blue-500 hover:bg-blue-200 px-5 py-3 rounded-md transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center">
                    <span>Login</span>
                    <ChevronDoubleRightIcon className="w-4" />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
