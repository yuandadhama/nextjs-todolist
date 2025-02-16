import React from "react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { BoxUpcomingActivity } from "./BoxActivity";
import Link from "next/link";

const UpcomingTodos = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <div className="h-[300px]">
      <div className="flex items-center gap-2 ">
        <DocumentArrowDownIcon className="w-5" />
        <h1 className="text-gray-700 font-semibold text-xl mb-2 leading-none mt-[6px]">
          Upcoming To-dos
        </h1>
      </div>

      {isEmpty ? (
        <div className="text-sm">
          <p className="text-gray-500 text-sm">No upcoming tasks for today.</p>
          <Link
            href="/dashboard/todos"
            className="flex text-blue-600 mt-2 hover:text-blue-300 bg-blue-100 w-[100px] rounded-md shadow-sm p-2 transition-all duration-300 ease-out"
          >
            <span className="font-semibold">create one +</span>
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          <BoxUpcomingActivity todo="Running" />
          <BoxUpcomingActivity todo="Walking" />
          <BoxUpcomingActivity todo="Learning" />
          <BoxUpcomingActivity todo="Praying" />
          <BoxUpcomingActivity todo="Winning" />
        </ul>
      )}
    </div>
  );
};

export default UpcomingTodos;
