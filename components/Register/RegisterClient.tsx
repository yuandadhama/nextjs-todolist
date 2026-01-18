import { CheckCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export function SubmitRegister({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-3 px-2 text-sm leading-3 rounded disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      <div className="font-bold text-xs text-blue-500 flex gap-1 ">
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
      <div className="bg-white rounded-lg shadow-sm ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
          <h3 className="text-xl flex items-center font-semibold text-green-500 gap-2 md:text-lg lg:text-xl xl:text-2xl">
            Successfully Registered
            <CheckCircleIcon className="w-8" />
          </h3>
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <p className="text-gray-600  tracking-wide md:text-base lg:text-lg xl:text-xl">
            You can now log in with your username and password.
          </p>
          <div className="flex gap-5">
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full text-blue-800 border hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
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
