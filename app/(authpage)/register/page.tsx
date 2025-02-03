"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (!success) return;

    setIsSuccess(success);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex items-center flex-col">
      <div className="mt-11">
        <HomeLink />

        <div className="w-full max-w-md relative flex flex-col">
          <h2 className="text-center text-2xl font-bold mb-4 text-white">
            Register
          </h2>

          {isSuccess ? (
            <div className="p-4 w-full max-w-md max-h-full">
              <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl flex items-center font-semibold text-green-500 dark:text-white gap-2">
                    Successfuly Registered
                    <CheckCircleIcon className="w-8" />
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <XMarkIcon className="w-10" />
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 tracking-wide ">
                    You can now log in with your username and password.
                  </p>
                  <form
                    className="flex gap-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSuccess(false);
                      setMessage("");
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full text-blue-800 border hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Go Back
                    </button>
                    <Link
                      href="/login"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center text-white mb-6">
                Join us today to manage your tasks efficiently and stay
                organized. Registration is quick and easy!
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
                    <Link
                      href="/login"
                      className="hover:text-blue-800 underline"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </>
          )}

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
