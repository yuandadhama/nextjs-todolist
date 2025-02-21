import React, { useEffect, useState } from "react";

const AddTodo = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll

    return () => {
      document.body.style.overflow = "auto"; // Enable scroll on close
    };
  }, []);

  const handleSubmit = () => {
    // Reset form
    setName("");
    setDescription("");
    setDateTime("");

    // Tutup modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Adding Todo
        </h2>

        {/* Input Nama Aktivitas */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-semibold">
            Name Activity
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Study"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Input Deskripsi */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-semibold">
            Description
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Study about adding dynamic modal in next js"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Input Waktu */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">
            Time to Do
          </label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md"
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
