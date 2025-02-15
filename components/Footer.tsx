import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Footer = async () => {
  const session = await getServerSession(authOptions);
  const isLogin = !!session;

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 xl:max-w-[1440px]">
        {/* footer content */}
        <div className="flex flex-wrap justify-between items-center">
          {/* title description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="title-footer">Simple TodoList</h3>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl">
              Organize your life, one task at a time.
            </p>
          </div>

          {/* quick links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="title-footer">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="link-footer">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={isLogin ? "/dashboard" : "/login"}
                  className="link-footer"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="link-footer">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* connect links */}
          <div className="w-full md:w-1/3">
            <h4 className="title-footer">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yuandadhama"
                  target="_blank"
                  className="link-footer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/definitely_damy"
                  target="_blank"
                  className="link-footer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:yuandhamap@gmail.com" className="link-footer">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs md:text-sm lg:text-base xl:text-lg xxl:text-xl">
          <p>
            &copy; {new Date().getFullYear()} Simple TodoList. All rights
            reserved.
          </p>
          <p className="text-gray-700">yuandhamap@gmail.com.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
