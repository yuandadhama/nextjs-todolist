import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
