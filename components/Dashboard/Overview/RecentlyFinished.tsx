import React from "react";
import { BoxRecentlyFinished } from "./BoxActivity";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const RecentlyFinished = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <div className="h-[300px]">
      <div className="flex items-center gap-2">
        <CheckBadgeIcon className="w-6" />
        <h1 className="text-gray-700 font-semibold text-xl mb-2 leading-none mt-[6px]">
          Recently Finished
        </h1>
      </div>

      {isEmpty ? (
        <>
          <p className="text-gray-500 text-sm">No todos finished recently.</p>
        </>
      ) : (
        <ul className="flex flex-col gap-2 ">
          <BoxRecentlyFinished todo="Running" />
          <BoxRecentlyFinished todo="Walking" />
          <BoxRecentlyFinished todo="Learning" />
          <BoxRecentlyFinished todo="Praying" />
          <BoxRecentlyFinished todo="Winning" />
        </ul>
      )}
    </div>
  );
};

export default RecentlyFinished;
