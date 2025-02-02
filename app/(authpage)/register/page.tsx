"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullname");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, username, password, confirmPassword }),
    });

    const { message, success } = await response.json();
    setMessage(message);

    if (success) {
      redirect("/login");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex items-center flex-col">
      <div className="mt-11">
        <HomeLink />

        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-4 text-white">
            Register
          </h2>
          <p className="text-center text-white mb-6">
            Join us today to manage your tasks efficiently and stay organized.
            Registration is quick and easy!
          </p>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            {/* full name input area */}
            <FormInput
              type="text"
              label="Full Name"
              name="fullname"
              placeholder="John Doe"
            />

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

            {/* password confirmation input area */}
            <FormInput
              type="password"
              label="Confirm Password"
              placeholder="********"
              name="confirmPassword"
            />

            {message && (
              <p className="text-red-500 font-semibold mb-3">{message}</p>
            )}
            {/* submit button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <div className="align-baseline font-bold text-sm text-blue-500 flex gap-2">
                <p>Already have an account?</p>
                <Link href="/login" className="hover:text-blue-800 underline">
                  Login
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
