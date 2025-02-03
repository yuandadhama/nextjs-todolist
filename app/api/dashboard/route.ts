import connectDB from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET() {
  await connectDB();

  const tokenCookie = (await cookies()).get("token");
  console.log(tokenCookie);

  if (!tokenCookie) {
    return NextResponse.json({
      success: false,
      message: "error getting token cookie",
    });
  }

  const payload = jwt.verify(tokenCookie.value, JWT_SECRET) as any;
  if (!payload || !payload.userId) {
    return NextResponse.json({
      success: false,
      message: "Invalid token, no payload provided",
    });
  }

  const { userId } = payload;
  const { fullName, username } = (await User.findOne({ _id: userId })) as IUser;

  return NextResponse.json({
    success: true,
    message: "Success",
    fullName,
    username,
  });
}
