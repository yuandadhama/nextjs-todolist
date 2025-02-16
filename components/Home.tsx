"use client";

import { useState } from "react";

const DirectButton = ({ isLogin }: { isLogin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button onClick={() => setIsLoading(true)} disabled={isLoading}>
      {isLoading ? ". . ." : isLogin ? "Go to Dashboard" : "Get Started"}
    </button>
  );
};

export default DirectButton;
