import React from "react";

const Redirecting = () => {
  return (
    <div className="bg-white shadow-md rounded px-4 py-6 mb-4 sm:px-6 md:px-7 lg:px-8 xl:px-10 xl:py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 md:p-5 ">
          <h3 className="text-xl flex items-center font-semibold text-green-500 gap-2">
            Redirecting . . .
          </h3>
        </div>
      </div>
    </div>
  );
};

export function HeaderLogin() {
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-1 text-white">Login</h2>
      <p className="text-center text-xs text-white mb-6">
        Welcome Friend! Please login to access your tasks and stay organized.
      </p>
    </>
  );
}

export default Redirecting;
