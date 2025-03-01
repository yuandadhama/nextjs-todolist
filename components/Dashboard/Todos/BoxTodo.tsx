import { ITodo } from "@/models/Todo";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export function BoxTodo({ todo }: { todo: ITodo }) {
  const { id, time, name, description } = todo;

  return (
    <li
      key={id}
      className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3 hover:shadow-md transition-shadow overflow-hidden w-full"
    >
      {/* Left side - Time & Task Info */}
      <div className="flex flex-2 items-center gap-3 max-w-[1000px]">
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

      {/* Right side - Action Buttons */}
      <div className="flex gap-4">
        {/* Update Button */}
        <button className="p-1 rounded-md text-gray-500-500 hover:text-gray-600 transition-colors hidden md:block lg:flex flex-row">
          <PencilSquareIcon className="w-5 h-5" />
          <p>Update</p>
        </button>

        {/* Delete Button */}
        <button className="p-1 rounded-md text-red-500 hover:text-red-600 transition-colors hidden md:block lg:flex flex-row">
          <TrashIcon className="w-5 h-5" />
          <p>Delete</p>
        </button>

        {/* Information Icon (Optional) */}
        <InfomationIcon />
      </div>
    </li>
  );
}

// Information Icon (For details or tooltips)
function InfomationIcon() {
  return (
    <InformationCircleIcon className="w-5 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors md:hidden" />
  );
}
