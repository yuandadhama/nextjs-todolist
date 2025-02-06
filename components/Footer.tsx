import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Simple TodoList</h3>
            <p className="text-sm">Organize your life, one task at a time.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yuandadhama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition duration-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/definitely_damy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:yuandhamap@gmail.com"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
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
