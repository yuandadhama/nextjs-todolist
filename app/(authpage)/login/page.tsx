"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Router from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to the desired page or perform any other action
        Router.push("/dashboard");
      } else {
        // Handle error response
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex items-center flex-col">
      <div className="mt-11">
        <HomeLink />
        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-4 text-white">
            Login
          </h2>
          <p className="text-center text-white mb-6">
            Welcome back Friend! Please login to access your tasks and stay
            organized.
          </p>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            {/* username input area */}
            <FormInput
              type="text"
              label="Username"
              name="username"
              placeholder="johndoe123"
            />

            {/* password input area */}
            <FormInput
              type="password"
              label="Password"
              placeholder="********"
              name="password"
            />

            {/* submit button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <div className="align-baseline font-bold text-sm text-blue-500 flex gap-2">
                <p>Don't have an account?</p>
                <Link
                  href="/register"
                  className="hover:text-blue-800 underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>

          <p className="text-center">
            &copy; {new Date().getFullYear()} Simple TodoList. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
