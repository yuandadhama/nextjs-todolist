import { ITodo } from "@/models/Todo";
import { useState } from "react";
import dynamic from "next/dynamic";

const BoxTodo = dynamic(() => import("../BoxTodo"), { ssr: false });
const InfoTodo = dynamic(() => import("../BoxTodo/InfoTodo"), {
  ssr: false,
});

export interface ITodoToDisplay {
  time: string;
  date: string;
  name: string;
  description: string;
}
const TodoListPage = ({ todos }: { todos: ITodo[] }) => {
  const [todoToDisplay, setTodoToDisplay] = useState<ITodoToDisplay | null>(
    null
  );

  const handleOpenModal = (todo: ITodo) => {
    setTodoToDisplay({
      time: todo.time,
      date: todo.date,
      name: todo.name,
      description: todo.description,
    });
  };

  const handleCloseModal = () => {
    setTodoToDisplay(null);
  };

  return (
    <>
      {/* Modal - separate from scrollable content */}
      {todoToDisplay && (
        <InfoTodo todoToDisplay={todoToDisplay} onClose={handleCloseModal} />
      )}

      <div className="h-[500px] overflow-y-auto space-y-4">
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, i) => (
              <BoxTodo key={i} todo={todo} onInfoClick={handleOpenModal} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-xs sm:text-base md:text-lg text-gray-600">
            You have not made any tasks at this date.
          </p>
        )}
      </div>
    </>
  );
};

export default TodoListPage;
