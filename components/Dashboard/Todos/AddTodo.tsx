import React, { useEffect, useState } from "react";
import SuccessModal from "./AddTodo/SuccessModal";

const AddTodo = ({
  onClose,
  onTodoAdded,
  setDate,
}: {
  onClose: () => void;
  onTodoAdded: () => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/dashboard/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        dateTime,
      }),
    });

    const { success, message } = await response.json();
    setIsSuccess(success);
    console.log(isSuccess);

    if (isSuccess == false) {
      console.log("failed");
      setMessage(message);
      setLoading(false);
      return;
    }

    // Reset form
    setName("");
    setDescription("");
    setDateTime("");
    setLoading(false);
  };

  const closeAfterSuccess = () => {
    setDate(new Date(dateTime));
    onClose();
    onTodoAdded();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
        <h2 className="text-lg font-semibold text-gray-700 mb-4  text-center">
          Adding Todo
        </h2>

        {isSuccess ? (
          <SuccessModal
            message={message}
            name={name}
            description={description}
            dateTime={dateTime}
            closeAfterSuccess={closeAfterSuccess}
          />
        ) : (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold">
                Name Activity
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Study"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold">
                Description
              </label>
              <textarea
                className="w-full h-[100px] resize-none p-2 border rounded-md outline-none"
                placeholder="Study about adding dynamic modal in next js"
                maxLength={150}
                value={description}
                disabled={loading}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold ">
                Time to Do
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md outline-none"
                value={dateTime}
                min={formatDateForInput(new Date())}
                onChange={(e) => setDateTime(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="text-red-600 text-sm mb-2 text-center">
              {message}
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
