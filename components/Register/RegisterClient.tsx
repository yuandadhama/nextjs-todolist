import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

export function SubmitRegister({ isLoading }: { isLoading: boolean }) {
  return (
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
        <Link href="/login" className="hover:text-blue-800 underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export function SuccessfullyRegister({
  setIsSuccess,
}: {
  setIsSuccess: (value: boolean) => void;
}) {
  return (
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
  );
}
