import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Logic to handle GET request for todo with id params.id
  const { id } = await params;
  const todo = await Todo.findById(id);

  console.log("get todo" + todo);
  if (!todo) {
    return new Response(JSON.stringify({ error: "Todo not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, description, date, time } = todo;
  return NextResponse.json({
    name,
    description,
    date,
    time,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Logic to handle PUT request for updating todo with id params.id
  const { id } = await params;
  const { name, description, date, time } = await request.json();

  await Todo.findByIdAndUpdate(
    id,
    { name, description, date, time },
    { new: true }
  );

  return NextResponse.json({ message: "Todo updated successfully" });
}
