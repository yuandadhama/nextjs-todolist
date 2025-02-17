import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function BoxUpcomingActivity({
  todo,
  time,
  description,
}: {
  todo: string;
  time: string;
  description: string;
}) {
  return (
    <li className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex flex-2 items-center gap-3">
        <div className="font-semibold text-base text-blue-600 text-center flex-1 md:text-lg">
          {time}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm line-clamp-1 md:text-base">
            {todo}
          </span>
          <p className="text-xs text-gray-500 line-clamp-2 md:text-sm">
            {description}
          </p>
        </div>
      </div>
      <div>
        <InfomationIcon />
      </div>
    </li>
  );
}

export function BoxRecentlyFinished({
  todo,
  finishedTime,
}: {
  todo: string;
  description: string;
  finishedTime: string;
}) {
  return (
    <li className="flex items-center justify-between bg-blue-100 shadow-sm rounded-lg p-4 mb-3 hover:shadow-md hover:bg-white transition-all duration-200 ease-out">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-blue-600 line-clamp-1 md:text-lg">
          {todo}
        </div>
        <span className="text-xs text-gray-500 md:text-sm">
          Finished at: <strong>{finishedTime}</strong>
        </span>
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
