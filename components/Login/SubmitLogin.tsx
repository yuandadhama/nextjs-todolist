import Link from "next/link";
import React from "react";

const SubmitLogin = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-3 px-2 text-sm leading-3 rounded disabled:opacity-50 md:text-base md:px-5 lg:text-lg xl:text-xl"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Login . . ." : "Login"}
      </button>
      <div className="font-bold text-xs text-blue-500 flex gap-1 md:text-base lg:text-lg xl:text-xl">
        <p>Don't have an account?</p>
        <Link href="/register" className="hover:text-blue-800 underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default SubmitLogin;
