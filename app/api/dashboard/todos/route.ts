import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Fetch user data from the database
  const user = await User.findById(session?.user.id);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }
  try {
    await connectDB();
    const { name, description, dateTime } = await req.json();

    if (!name || !description || !dateTime) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1];

    const existingTodo = await Todo.findOne({
      userId: user?.id,
      time,
      date,
    });

    if (existingTodo) {
      return NextResponse.json({
        message: "A todo with the same time and date already exists",
        success: false,
      });
    }

    const newTodo = new Todo({
      name,
      description,
      time,
      date,
      userId: user?.id,
      isCompleted: false,
    });

    await newTodo.save();
    revalidatePath("/dashboard/todos");
    return NextResponse.json({
      message: "Todo added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // Fetch user data from the database
  const user = await User.findById(session?.user.id);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    // Get the date query parameter (expected format: YYYY-MM-DD)
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    // Fetch todos for the given date
    const todos = await Todo.find({ date: dateParam, userId: user?.id }).sort({
      time: 1,
    });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      success: false,
    });
  }
}
