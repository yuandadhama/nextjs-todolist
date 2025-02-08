"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setMessage(result.error);
    } else {
      router.push("/dashboard"); // Redirect on success
      setIsSuccess(true);
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
            Welcome Friend! Please login to access your tasks and stay
            organized.
          </p>

          {isSuccess ? (
            <div className="p-4 w-full max-w-md max-h-full">
              <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl flex items-center font-semibold text-green-500 dark:text-white gap-2">
                    Redirecting . . .
                  </h3>
                </div>
              </div>
            </div>
          ) : (
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

              {message && (
                <p className="text-red-500 font-semibold mb-3">{message}</p>
              )}

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
