"use server";

import Todo from "@/models/Todo";

export async function deleteTodo(id: string) {
  console.log("(server) Deleting todo with id:", id);
  await Todo.findByIdAndDelete(id);
}
