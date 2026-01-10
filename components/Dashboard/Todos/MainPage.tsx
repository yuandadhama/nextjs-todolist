"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState } from "react";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // this is the date to control todos page display, when this changes the correspond todos will appear
  const [date, setDate] = useState(new Date());

  // to refetch data each time adding new todo
  const [refreshTodos, setRefreshTodos] = useState(false); // Trigger re-fetch

  const handleTodoAdded = () => {
    setRefreshTodos((prev) => !prev);
    setIsModalOpen(false);
  };

  return (
    <main className="mb-8 flex flex-col md:p-6  md:py-4">
      <div className="relative flex justify-center">
        {isModalOpen && (
          <AddTodo
            onClose={() => setIsModalOpen(false)}
            onTodoAdded={handleTodoAdded}
            setDate={setDate}
          />
        )}
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PencilSquareIcon className="w-6 text-gray-700" />
          <h1 className="text-gray-700 font-semibold text-2xl leading-none">
            To-Dos
          </h1>
        </div>
        {/* Add New Todo Button */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md text-sm transition-all ease-in-out"
          onClick={() => setIsModalOpen(true)}
        >
          Add Todo +
        </button>
      </div>

      <div className="h-full">
        <div className="w-full flex justify-center">
          <div className="w-full">
            <TodoList
              date={date}
              setDate={setDate}
              refreshTrigger={refreshTodos}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
