import React, { useCallback, useEffect, useState } from "react";
import { BoxTodo } from "./BoxTodo";
import { ITodo } from "@/models/Todo";

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
        console.error("Error fetching todos:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, refreshTrigger]); // Re-fetch todos when refreshTrigger changes

  const goToPreviousDate = useCallback(() => {
    setLoading(true);
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, []);

  const goToNextDate = useCallback(() => {
    setLoading(false);
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
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, index) => (
              <BoxTodo key={index} todo={todo} />
            ))}
          </ul>
        ) : loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <p className="text-center text-gray-600">
            You have not made any tasks at this date.
          </p>
        )}
      </div>
    </>
  );
};

export default TodoList;
