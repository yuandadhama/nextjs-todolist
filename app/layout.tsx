import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simple TodoList",
  description: "Simple yet fullstack web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
