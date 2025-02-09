"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        username,
        password,
        confirmPassword,
      }),
    });

    const { success, error } = await response.json();
    setIsSuccess(success);
    setIsLoading(false);

    if (!success && error) {
      setErrors(error);
    }
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
                    Successfully Registered
                    <CheckCircleIcon className="w-8" />
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <XMarkIcon className="w-6" />
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 tracking-wide">
                    You can now log in with your username and password.
                  </p>
                  <div className="flex gap-5">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="w-full text-blue-800 border hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Go Back
                    </button>
                    <Link
                      href="/login"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </Link>
                  </div>
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
                <FormInput
                  type="text"
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  error={errors.fullName ? errors.fullName[0] : ""}
                />

                <FormInput
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="johndoe123"
                  error={errors.username ? errors.username[0] : ""}
                />

                <FormInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="********"
                  error={errors.password ? errors.password[0] : ""}
                />

                <FormInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="********"
                  error={
                    errors.confirmPassword ? errors.confirmPassword[0] : ""
                  }
                />

                {errors.global && (
                  <p className="text-red-500 text-center mb-4">
                    {errors.global[0]}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <button
                    className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
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
