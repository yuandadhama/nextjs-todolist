"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromServer } from "./GetUser";

// Define user type
type User = {
  fullName: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLogin: boolean;
  logout: () => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// custom hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUserFromServer();
        setUser(result);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null); // Clear user state
    window.location.href = "/login"; // Redirect after logout
  };

  const isLogin = !!user; // `true` if user exists, otherwise `false`

  return (
    <AuthContext.Provider value={{ user, loading, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
