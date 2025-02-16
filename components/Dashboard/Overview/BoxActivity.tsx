import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function BoxUpcomingActivity({ todo }: { todo: string }) {
  return (
    <li className="flex text-sm items-center justify-between bg-blue-100 rounded p-2">
      <div className="flex gap-2">
        <div>09:00 AM</div>
        <span>|</span>
        <div>{todo}</div>

        <div className="hidden text-gray-500 text-sm md:inline-block ml-2">
          Lorem ipsum dolor sit amet
        </div>
      </div>
      <div>
        <InformationCircleIcon className="w-4" />
      </div>
    </li>
  );
}

export function BoxRecentlyFinished({ todo }: { todo: string }) {
  return (
    <li className="flex text-sm items-center justify-between bg-blue-100 rounded p-2">
      <div className="flex gap-2 items-center">
        <div>{todo}</div>
        <div>|</div>
        <div className="text-xs">finished at: 12:50 PM</div>
      </div>
      <div>
        <InformationCircleIcon className="w-4" />
      </div>
    </li>
  );
}
