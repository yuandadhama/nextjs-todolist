import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUserId(): Promise<any> {
  const cookiesStore = await cookies();
  return cookiesStore.getAll();
}

export async function GET(req: Request) {
  await connectDB();
  const { userId } = await req.json();

  const user = await User.findOne({ _id: userId });

  return NextResponse.json({
    success: true,
    username: user?.username,
    userId: getUserId(),
  });
}
