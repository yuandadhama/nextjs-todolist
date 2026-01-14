import { ITodo } from "@/models/Todo";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteTodo } from "@/actions/todo";

export default function BoxTodo({
  todo,
  onInfoClick,
  onTodoDeleted,
  showUpdateModal,
  setToBeUpdatedTodoId,
}: {
  todo: ITodo;
  onInfoClick: (todo: ITodo) => void;
  onTodoDeleted: () => void;
  showUpdateModal: () => void;
  setToBeUpdatedTodoId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { time, name, description, _id } = todo;

  // function to delete todo
  const handleDelete = async () => {
    deleteTodo(_id!);
    onTodoDeleted();
    console.log("(client) Deleting todo with id:", _id);
  };

  const handleCancelDelete = () => {
    setDeleteToggle(false);
  };

  window.addEventListener("resize", () => {
    setDeleteToggle(false);
  });

  const handleUpdatebuttonClick = () => {
    setToBeUpdatedTodoId(_id!);
    showUpdateModal();
  };

  return (
    <li className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3 hover:shadow-md transition-shadow overflow-hidden w-full">
      {/* Left Side - Todo Info */}
      <div className="flex flex-2 items-center gap-3 max-w-[1000px] mr-2">
        <div className="font-semibold text-base text-blue-600 text-center flex-1 md:text-lg">
          {time}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm line-clamp-1 break-all md:text-base">
            {name}
          </span>
          <p className="text-xs text-gray-500 line-clamp-2 md:text-sm break-all">
            {description}
          </p>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex gap-4 relative">
        <AnimatePresence mode="wait">
          {deleteToggle ? (
            <motion.div
              key="delete-confirm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 items-center"
            >
              <button
                className="p-1 rounded-md text-red-500 hover:opacity-80  transition-colors md:flex lg:flex flex-row underline"
                onClick={handleDelete}
              >
                <p>Delete</p>
              </button>

              <p className="p-1">Confirm Delete</p>

              <button
                className="p-1 rounded-md hover:opacity-80 text-gray-600 transition-colors md:flex lg:flex flex-row underline"
                onClick={handleCancelDelete}
              >
                <p>Cancel</p>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4"
            >
              <button
                className="p-1 rounded-md hidden hover:text-gray-700 text-gray-600 transition-colors md:flex lg:flex flex-row"
                onClick={handleUpdatebuttonClick}
              >
                <PencilSquareIcon className="w-5 h-5" />
                <p>Update</p>
              </button>

              <button
                className="p-1 rounded-md hidden text-red-500 hover:text-red-600 transition-colors md:flex lg:flex flex-row"
                onClick={() => setDeleteToggle(true)}
              >
                <TrashIcon className="w-5 h-5" />
                <p>Delete</p>
              </button>

              <InformationCircleIcon
                className="w-5 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => onInfoClick(todo)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}
