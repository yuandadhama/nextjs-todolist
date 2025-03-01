import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";

import { ITodo } from "@/models/Todo";

const TodoListPage = lazy(() => import("./TodoList/TodoListPage"));
import LoadingTodos from "./LoadingTodos";

const TodoList = ({
  refreshTrigger,
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  refreshTrigger: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear() as number;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const formattedDate = formatDateForAPI(date);
      const response = await fetch(
        `/api/dashboard/todos?date=${formattedDate}`
      );
      const data = await response.json();

      if (response.ok) {
        const sortedTodos = data.sort((a: ITodo, b: ITodo) =>
          a.time.localeCompare(b.time)
        );
        setTodos(sortedTodos);
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, refreshTrigger]);

  const goToPreviousDate = useCallback(() => {
    setLoading(true);
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, []);

  const goToNextDate = useCallback(() => {
    setLoading(true);
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mx-auto mb-4 max-w-[250px]">
        <button
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl disabled:text-gray-400"
          onClick={goToPreviousDate}
          disabled={
            loading || formatDateForAPI(date) == formatDateForAPI(new Date())
          }
        >
          {"<"}
        </button>

        <input
          type="date"
          value={formatDateForAPI(date)}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="text-lg text-gray-700 font-semibold border rounded-md px-2 py-1 outline-none"
          min={formatDateForAPI(new Date())}
          disabled={loading}
        />

        <button
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl disabled:text-gray-400"
          onClick={goToNextDate}
          disabled={loading}
        >
          {">"}
        </button>
      </div>

      <div className="h-[500px] overflow-y-auto space-y-4 mt-4">
        {loading ? <LoadingTodos /> : <TodoListPage todos={todos} />}
      </div>
      <p className="text-red-600 text-center">{errorMsg}</p>
    </>
  );
};

export default TodoList;
