import Activity from "@/components/Activity";
import React from "react";

const page = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="text-2xl text-blue-500 text-left">
        <h1 className="">Manage Your Activity</h1>
        <h2>Change Your Life</h2>
      </div>
      <div>
        <ul className="bg-blue-200 size-80 rounded p-7">
          <Activity activity="Learn javascript about promise" />
        </ul>
      </div>
    </div>
  );
};

export default page;
