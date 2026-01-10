"use client";

import HomeLink from "@/components/form-ui/HomeLink";
import { FormInput } from "@/components/form-ui/Inputs";
import Redirecting, { HeaderLogin } from "@/components/Login/LoginClient";
import SubmitLogin from "@/components/Login/SubmitLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Page = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      if (!username || !password) {
        setErrors({ global: ["Username and Password required"] });
        setIsLoading(false);
      } else {
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false, // Prevent automatic redirection
        });

        if (result?.error) {
          try {
            setErrors(JSON.parse(result.error)); // Parse the error from JSON
          } catch {
            setErrors({ global: ["Something went wrong. Please try again."] });
          }
        } else {
          setIsSuccess(true);
          router.push("/dashboard/overview"); // Redirect on success
        }
      }
    } catch {
      setErrors({ global: ["Something went wrong. Please try again."] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex items-center flex-col">
      <div className="mt-11 p-3">
        <HomeLink />
        <div className="w-full max-w-md relative flex flex-col md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <HeaderLogin />
         
          {isSuccess ? (
            <Redirecting />
          ) : (
            <form
              className="bg-white shadow-md rounded px-4 py-6 mb-4 sm:px-6 md:px-7 lg:px-8 xl:px-10 xl:py-8"
              onSubmit={handleSubmit}
            >
              {/* username input area */}
              <FormInput
                type="text"
                label="Username"
                name="username"
                placeholder="johndoe123"
                error={errors.username ? errors.username[0] : ""}
              />

              {/* password input area */}
              <FormInput
                type="password"
                label="Password"
                placeholder="********"
                name="password"
                error={errors.password ? errors.password[0] : ""}
              />

              {errors.global && (
                <p className="text-red-500 text-center mb-4 text-xs leading-3 mt-2 md:text-sm lg:text-base xl:text-lg">
                  {errors.global[0]}
                </p>
              )}

              {/* submit button */}
              <SubmitLogin isLoading={isLoading} />
            </form>
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
