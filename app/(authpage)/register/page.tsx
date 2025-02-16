"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import {
  SubmitRegister,
  SuccessfullyRegister,
} from "@/components/Register/RegisterClient";
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
      <div className="mt-2 p-4 md:mt-8">
        <HomeLink />
        <div className="w-full max-w-md relative flex flex-col md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <h2 className="text-center text-lg font-bold mb-1 text-white md:text-xl md:mb-3 lg:text-2xl xl:text-3xl">
            Register
          </h2>

          {isSuccess ? (
            <SuccessfullyRegister setIsSuccess={setIsSuccess} />
          ) : (
            <>
              <p className="text-center text-xs text-white mb-6 md:text-base lg:text-xl xl:text-2xl">
                Join us today to manage your tasks efficiently and stay
                organized. Registration is quick and easy!
              </p>

              <form
                className="bg-white shadow-md rounded px-4 py-6 mb-4 sm:px-6 md:px-7 lg:px-8 xl:px-10 xl:py-8"
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

                <SubmitRegister isLoading={isLoading} />
              </form>
            </>
          )}

          <p className="text-center text-xs md:text-base lg:text-lg">
            &copy; {new Date().getFullYear()} Simple TodoList. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
