"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [loading, setloading] = useState(false);
  console.error(error.message);

  const handleReset = () => {
    setloading(true);
    reset();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center p-4">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-xl mt-4">
        Something went wrong, check your connection, try refresh the page or try
        again later.
      </p>
      <h1 className="mt-6">
        <button
          onClick={() => handleReset()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-out"
        >
          {loading ? "redirecting. . ." : "Go Back to Home"}
        </button>
      </h1>
    </div>
  );
}
