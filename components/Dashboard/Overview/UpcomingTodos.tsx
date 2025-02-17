import React from "react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { BoxUpcomingActivity } from "./BoxActivity";
import Link from "next/link";

const upcomingActivities = [
  {
    todo: "Team Meeting with Developers",
    time: "09:00 ",
    description: "Discuss project milestones & deadlines",
  },
  {
    todo: "Code Review Session",
    time: "11:30 ",
    description: "Review pull requests and give feedback",
  },
  {
    todo: "Lunch with Clients",
    time: "01:00 ",
    description: "Meet with clients to discuss project updates",
  },
  {
    todo: "UI/UX Design Feedback",
    time: "03:15 ",
    description: "Provide feedback on the latest UI/UX prototype",
  },
  {
    todo: "Daily Standup Meeting",
    time: "05:00 ",
    description: "Sync up with the team for daily updates",
  },
];

const UpcomingTodos = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <div className="min-h-[500px] h-auto mb-8 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <DocumentArrowDownIcon className="w-5 md:w-6" />
        <h1 className="text-gray-700 font-semibold text-xl mb-2 leading-none mt-[6px] md:text-2xl">
          Upcoming To-dos
        </h1>
      </div>

      {isEmpty ? (
        <div className="flex flex-col justify-center items-center text-center text-sm flex-grow">
          <p className="text-gray-500">No upcoming tasks for today.</p>
          <Link
            href="/dashboard/todos"
            className="mt-2 text-blue-600 hover:text-blue-300 bg-blue-100 rounded-md shadow-sm p-2 transition-all duration-300 ease-out"
          >
            <span className="font-semibold">Create one +</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-auto flex-grow">
          <ul className="flex flex-col gap-3 max-h-[calc(100%-72px)]">
            {" "}
            {/* Adjust the 72px to suit your spacing needs */}
            {upcomingActivities.map((data, index) => (
              <BoxUpcomingActivity
                key={index}
                todo={data.todo}
                time={data.time}
                description={data.description}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpcomingTodos;
