import React from "react";
import { BoxTodo } from "./BoxTodo";

const todos = [
  {
    id: 1,
    name: "Buy groceries",
    time: "14:00",
    description: "Pick up fruits, vegetables, and milk.",
    isCompleted: false,
  },
  {
    id: 2,
    name: "Finish project",
    time: "09:00",
    description: "Complete the final draft of the project report.",
    isCompleted: false,
  },
  // (other todos here)
];
const TodoList = ({
  hideLeftButton,
  hideRightButton,
}: {
  hideLeftButton?: boolean;
  hideRightButton?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between items-center mx-auto mb-4 max-w-[200px] ">
        <button
          className={`${
            hideLeftButton && "lg:text-transparent"
          } text-gray-600 hover:text-gray-800 cursor-pointer text-xl`}
        >
          {"<"}
        </button>
        <h1 className="text-lg text-gray-700 font-semibold">Feb 17, 2025</h1>
        <button
          className={`${
            hideRightButton && "lg:text-transparent"
          } text-gray-600 hover:text-gray-800 cursor-pointer text-xl`}
        >
          {">"}
        </button>
      </div>

      {/* To-Do List */}
      <div className="h-[500px] overflow-y-auto space-y-4 mt-4">
        {todos.map((todo) => (
          <BoxTodo
            key={todo.id}
            todo={todo.name}
            time={todo.time}
            description={todo.description}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
