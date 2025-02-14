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
          } catch (error) {
            setErrors({ global: ["Something went wrong. Please try again."] });
          }
        } else {
          setIsSuccess(true);
          router.push("/dashboard"); // Redirect on success
        }
      }
    } catch (error) {
      setErrors({ global: ["Something went wrong. Please try again."] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex items-center flex-col">
      <div className="mt-11">
        <HomeLink />
        <div className="w-full max-w-md">
          <HeaderLogin />

          {isSuccess ? (
            <Redirecting />
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
                <p className="text-red-500 text-center mb-4">
                  {errors.global[0]}
                </p>
              )}

              {/* submit button */}
              <SubmitLogin isLoading={isLoading} />
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
