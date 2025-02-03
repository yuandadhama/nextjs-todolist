import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret"; // Atur di .env.local untuk keamanan

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "Username and password is required",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      NextResponse.json({
        success: false,
        message: "Username or password is wrong",
      });
    }

    const isMatch = await bcrypt.compare(password, user?.password as string);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Username or password is wrong",
      });
    }

    const token = jwt.sign({ userId: user?._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 3600,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production", // Jika NODE_ENV production, maka set secure: true
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
