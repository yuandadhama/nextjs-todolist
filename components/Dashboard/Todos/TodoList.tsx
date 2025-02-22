import React, { useCallback, useEffect, useState } from "react";
import { BoxTodo } from "./BoxTodo";
import { ITodo } from "@/models/Todo";

const TodoList = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState<ITodo[]>([]);

  // Format date to YYYY-MM-DD for API query
  const formatDateForAPI = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Fetch To-Do List from API
  const fetchTodos = async () => {
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
  };

  useEffect(() => {
    fetchTodos();
  }, [date]);

  const goToPreviousDate = useCallback(() => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, []);

  const goToNextDate = useCallback(() => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }, []);

  // Handle user selecting a date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
  };

  return (
    <>
      <div className="flex justify-between items-center mx-auto mb-4 max-w-[250px]">
        <button
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl disabled:text-gray-400"
          onClick={goToPreviousDate}
          disabled={loading}
        >
          {"<"}
        </button>

        {/* Date Picker Input */}
        <input
          type="date"
          value={formatDateForAPI(date)}
          onChange={handleDateChange}
          className="text-lg text-gray-700 font-semibold border rounded-md px-2 py-1 outline-none"
        />

        <button
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl disabled:text-gray-400"
          onClick={goToNextDate}
          disabled={loading}
        >
          {">"}
        </button>
      </div>

      {/* To-Do List */}
      <div className="h-[500px] overflow-y-auto space-y-4 mt-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ul>
              <BoxTodo key={todo.id} todo={todo} />
            </ul>
          ))
        ) : loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <p className="text-center text-gray-600">No tasks for this date.</p>
        )}
      </div>
    </>
  );
};

export default TodoList;
