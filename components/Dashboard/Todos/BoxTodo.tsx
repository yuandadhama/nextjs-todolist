import { ITodo } from "@/models/Todo";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function BoxTodo({ todo }: { todo: ITodo }) {
  return (
    <li
      key={todo.id}
      className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3 hover:shadow-md transition-shadow overflow-hidden "
    >
      <div className="flex flex-2 items-center gap-3">
        <div className="font-semibold text-base text-blue-600 text-center flex-1 md:text-lg">
          {todo.time}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm line-clamp-1 md:text-base">
            {todo.name}
          </span>
          <p className="text-xs text-gray-500 line-clamp-2 md:text-sm break-all">
            {todo.description}
          </p>
        </div>
      </div>
      <div>
        <InfomationIcon />
      </div>
    </li>
  );
}

function InfomationIcon() {
  return (
    <InformationCircleIcon className="flex-1 w-4 ml-1 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors md:w-5" />
  );
}
