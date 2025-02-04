import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.error("something went wrong:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
