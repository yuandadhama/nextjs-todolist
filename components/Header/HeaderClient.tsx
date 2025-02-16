"use client";

import {
  ArrowRightIcon,
  ChevronDoubleRightIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const HeaderClient = ({
  username,
  isLogin,
}: {
  username: string;
  isLogin: boolean;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full py-3 px-4 md:py-0  transition-all duration-300 ${
        isScrolled ? "bg-blue-500 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-center">
        <div className="flex justify-between items-center w-full container md:p-4 xl:max-w-[1440px]">
          <div className="flex h-full items-center gap-1 text-white text-lg font-semibold sm:text-2xl md:text-3xl">
            {isDashboard && isLogin ? (
              <>
                <UserCircleIcon className="w-10" />
                <div>{username.trim()}</div>
              </>
            ) : (
              "TodoList App"
            )}
          </div>
          <div className="flex">
            {isLogin ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn-login-out"
              >
                <div className="flex items-center gap-2">
                  <span>Logout</span>
                  <ArrowRightIcon className="w-4 " />
                </div>
              </button>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-white hover:text-gray-400 px-5 py-3 rounded-md transition-all duration-300 ease-in-out text-sm underline underline-offset-1 leading-3 md:text-base lg:text-xl xl:text-2xl xl:underline-offset-2"
                >
                  Register
                </Link>
                <Link href="/login" className="btn-login-out">
                  <div className="flex items-center gap-1">
                    <span>Login</span>
                    <ChevronDoubleRightIcon className="w-3" />
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

export default HeaderClient;
