import { CheckIcon } from "@heroicons/react/16/solid";
import React, { act } from "react";

const Activity = ({ activity }: { activity: string }) => {
  return (
    <li>
      <div className="flex">
        <p>{activity}</p>
        <div>
          <CheckIcon className="w-6" />
        </div>
      </div>
    </li>
  );
};

export default Activity;
