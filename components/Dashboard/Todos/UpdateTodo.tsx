import { ITodo } from "@/models/Todo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
const SuccessModal = dynamic(() => import("./AddTodo/SuccessModal"));

const UpdateTodo = ({
  toBeUpdatedTodoId,
  onClose,
  onTodoUpdated,
  setDate,
}: {
  toBeUpdatedTodoId: string;
  onClose: () => void;
  onTodoUpdated: () => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const formatDateForInput = (date: Date) => {
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll

    return () => {
      document.body.style.overflow = "auto"; // Enable scroll on close
    };
  }, []);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(
          `/api/dashboard/todos/${toBeUpdatedTodoId}`
        );
        if (!response.ok) throw new Error("failed to fetch todo data by id");

        const todo = (await response.json()) as ITodo;
        const { name, description, date, time } = todo;
        setName(name);
        setDescription(description);
        setDateTime(date + "T" + time);
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTodo();
  }, [toBeUpdatedTodoId]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/dashboard/todos/${toBeUpdatedTodoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            date: dateTime.split("T")[0],
            time: dateTime.split("T")[1],
          }),
        }
      );
      const { message } = await response.json();
      setIsSuccess(true);
      setMessage(message);
    } catch (error) {
      console.error("Error updating todo:", error);
      setMessage("Failed to update todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeAfterSuccess = () => {
    setDate(new Date(dateTime));
    onClose();
    onTodoUpdated();
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6 z-10">
      <div
        className={`${
          isSuccess && "bg-transparent"
        } bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]`}
      >
        <h2 className=" text-lg font-semibold text-gray-700 mb-4 text-center">
          📝 Update Todo
        </h2>

        {isSuccess ? (
          <SuccessModal
            message={message}
            name={name}
            description={description}
            dateTime={dateTime}
            closeAfterSuccess={closeAfterSuccess}
          />
        ) : isFetching ? (
          <Spinner />
        ) : (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold">
                Name Activity
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Study"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                title="input the name of todo"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold">
                Description
              </label>
              <textarea
                className="w-full h-[100px] resize-none p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Study about adding dynamic modal in Next.js"
                maxLength={150}
                value={description}
                disabled={loading}
                onChange={(e) => setDescription(e.target.value)}
                title="input description or some explanation about the todo"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Time to Do
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={dateTime}
                min={formatDateForInput(new Date())}
                onChange={(e) => setDateTime(e.target.value)}
                disabled={loading}
                title="input the date and time to do this todo"
                required
              />
            </div>

            {message && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {message}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-all disabled:bg-red-300"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 flex items-center justify-center gap-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-all disabled:bg-green-300"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateTodo;
