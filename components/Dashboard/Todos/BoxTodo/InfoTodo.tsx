"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ITodoToDisplay } from "../TodoList/TodoListPage";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface InfoTodoProps {
  todoToDisplay: ITodoToDisplay;
  onClose: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const InfoTodo: React.FC<InfoTodoProps> = ({
  todoToDisplay,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const { name, description, time, date } = todoToDisplay;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50 z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 md:w-8" />
          </button>

          <div className="px-6 py-4 mt-5">
            <h2
              id="todo-modal-title"
              className="text-2xl font-bold md:text-3xl text-gray-800 mb-4"
            >
              📝 Task Details
            </h2>
            <div className="space-y-3 text-sm md:text-base break-all">
              <p className="text-gray-700">
                <span className="font-semibold">📌 Name:</span> {name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">🧾 Description:</span>{" "}
                {description}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📅 Date:</span> {date}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">🕒 Time:</span> {time}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded shadow transition duration-200"
            >
              Update
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow transition duration-200"
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoTodo;
