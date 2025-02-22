import React, { useEffect, useState } from "react";

const AddTodo = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll

    return () => {
      document.body.style.overflow = "auto"; // Enable scroll on close
    };
  }, []);

  const handleSubmit = async () => {
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
    if (!success) {
      setMessage(message);
      return;
    }

    // Reset form
    setName("");
    setDescription("");
    setDateTime("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 ">
          Adding Todo
        </h2>

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
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        <div className="text-red-600 text-sm mb-2 text-center">{message}</div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
