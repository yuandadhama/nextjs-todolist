import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullName, username, password, confirmPassword } = await req.json();

    if (!fullName || !username || !password || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password != confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash the password before saving it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
    });
    newUser.save();
    return NextResponse.json({ success: true, message: "Register Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
