"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState } from "react";

const MainPage = ({ isEmpty }: { isEmpty: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="mb-8 flex flex-col md:p-6 md:py-4">
      <div className="relative flex justify-center">
        {isModalOpen && <AddTodo onClose={() => setIsModalOpen(false)} />}
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
        {isEmpty ? (
          <div className="flex items-center justify-center text-gray-600 text-xl">
            No todos at this date. Add a new one above.
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="flex justify-around px-3 gap-3 w-full">
              <div className="w-full">
                <TodoList hideRightButton />
              </div>
              <div className="h-full w-[1px] bg-blue-600 hidden lg:block"></div>
              <div className="hidden w-full lg:block">
                <TodoList hideLeftButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainPage;
