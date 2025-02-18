"use client";

import React, { useEffect, useRef, useState } from "react";
import { BoxRecentlyFinished } from "./BoxActivity";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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
];

const RecentlyFinished = ({ isEmpty }: { isEmpty: boolean }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Define hint text based on selected period
  const getHintText = () => {
    switch (selectedPeriod) {
      case "today":
        return "No todos finished today";
      case "2days":
        return "No todos finished in the last 2 days";
      case "3days":
        return "No todos finished in the last 3 days";
      default:
        return "No todos finished recently";
    }
  };

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowScrollIndicator(scrollRef.current.scrollTop === 0);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="mb-5 sm:mb-8 ">
      <div className="flex flex-wrap gap-2 justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckBadgeIcon className="w-5 md:w-6" />
          <h1 className="text-gray-700 font-semibold text-xl mb-1 leading-none md:text-2xl">
            Recently Finished
          </h1>
        </div>

        {/* Select Period Dropdown */}
        <select
          className="border border-gray-300 rounded-md w-full sm:w-auto p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="2days">2 Days Ago</option>
          <option value="3days">3 Days Ago</option>
        </select>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="min-h-[480px] h-auto max-h-[600px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100"
        >
          {isEmpty ? (
            <p className="text-gray-500 ml-3 text-sm">{getHintText()}</p>
          ) : (
            <ul className="flex flex-col gap-2 mt-4 mx-2">
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

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDownIcon className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyFinished;
