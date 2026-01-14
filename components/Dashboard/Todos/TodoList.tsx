import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ITodo } from "@/models/Todo";

const Spinner = dynamic(() => import("./Spinner"));
const TodoListPage = dynamic(() => import("./TodoList/TodoListPage"));

// THIS TODO LIST SECTION TO DISPLAY TODOS BASED ON SELECTED DATE
// THE TODO LIST PAGE IS MORE SPECIFIC TO DISPLAY TODOS ON CERTAIN DATE

const TodoList = ({
  refreshTrigger,
  date,
  setDate,
  onTodoDeleted,
  showUpdateModal,
  setToBeUpdatedTodoId,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  refreshTrigger: boolean;
  onTodoDeleted: () => void;
  showUpdateModal: () => void;
  setToBeUpdatedTodoId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // format date: yyyy-mm-dd
  const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear() as number;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      try {
        const formattedDate = formatDateForAPI(date);
        const res = await fetch(`/api/dashboard/todos?date=${formattedDate}`);
        const data = await res.json();

        if (res.ok) {
          setTodos(
            data.sort((a: ITodo, b: ITodo) => a.time.localeCompare(b.time))
          );
        } else {
          setErrorMsg("Failed to fetch todos");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchTodos();
  }, [date, refreshTrigger]);

  const goToPreviousDate = useCallback(() => {
    setLoading(true);
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, [setDate]);

  const goToNextDate = useCallback(() => {
    setLoading(true);
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }, [setDate]);

  return (
    <>
      <div className="flex justify-between items-center mx-auto mb-4 max-w-[250px]">
        <button
          className={`${
            formatDateForAPI(date) == formatDateForAPI(new Date())
              ? "invisible"
              : ""
          } text-gray-600 hover:text-gray-800 cursor-pointer text-xl disabled:text-gray-400`}
          onClick={goToPreviousDate}
          disabled={loading}
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
        {loading ? (
          <Spinner />
        ) : (
          <TodoListPage
            todos={todos}
            onTodoDeleted={onTodoDeleted}
            showUpdateModal={showUpdateModal}
            setToBeUpdatedTodoId={setToBeUpdatedTodoId}
          />
        )}
      </div>
      <p className="text-red-600 text-center">{errorMsg}</p>
    </>
  );
};

export default TodoList;
