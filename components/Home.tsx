"use client";

import { useState } from "react";

const DirectButton = ({ isLogin }: { isLogin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <span onClick={() => setIsLoading(true)}>
      {isLoading ? ". . ." : isLogin ? "Go to Dashboard" : "Get Started"}
    </span>
  );
};

export default DirectButton;
