import React from "react";
import { BoxRecentlyFinished } from "./BoxActivity";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const finishedActivities = [
  {
    todo: "Complete Next.js Authentication",
    description: "Implemented OAuth & JWT authentication",
    finishedTime: "Feb 17, 2025 - 12:50 PM",
  },
  {
    todo: "Fix Database Connection Issue",
    description: "Resolved MongoDB connection timeout errors",
    finishedTime: "Feb 17, 2025 - 03:30 PM",
  },
  {
    todo: "Deploy App to Vercel",
    description: "Successfully deployed the production version",
    finishedTime: "Feb 16, 2025 - 09:45 AM",
  },
  {
    todo: "Optimize API Performance",
    description: "Reduced API response time by 40%",
    finishedTime: "Feb 16, 2025 - 11:20 AM",
  },
  {
    todo: "UI/UX Design Feedback",
    finishedTime: "Feb 16, 2025 - 11:20 AM",
    description: "Provide feedback on the latest UI/UX prototype",
  },
];

const RecentlyFinished = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <div className="min-h-[480px] h-auto">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <CheckBadgeIcon className="w-5 md:w-6" />
          <h1 className="text-gray-700 font-semibold text-xl mb-1 leading-none md:text-2xl">
            Recently Finished
          </h1>
        </div>

        {/* Select Period Dropdown */}
        <select className="border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="today">Today</option>
          <option value="2days">2 Days Ago</option>
          <option value="3days">3 Days Ago</option>
          <option value="1week">One Week Ago</option>
        </select>
      </div>

      {isEmpty ? (
        <p className="text-gray-500 text-sm">No todos finished recently</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {finishedActivities.map((activity, index) => (
            <BoxRecentlyFinished
              key={index}
              todo={activity.todo}
              finishedTime={activity.finishedTime}
              description={activity.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentlyFinished;
