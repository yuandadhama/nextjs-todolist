import connectDB from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  return Response.json({ message: "Database connected successfully" });
}
