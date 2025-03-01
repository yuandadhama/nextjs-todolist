import React from "react";

const LoadingTodos = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingTodos;
