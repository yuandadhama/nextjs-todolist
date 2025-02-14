import Link from "next/link";
import React from "react";

const SubmitLogin = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {isLoading ? "Login . . ." : "Login"}
      </button>
      <div className="align-baseline font-bold text-sm text-blue-500 flex gap-2">
        <p>Don't have an account?</p>
        <Link href="/register" className="hover:text-blue-800 underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default SubmitLogin;
