import classNames from "classnames";
import React from "react";

const GroupTitle = ({ icon, title = "", className }) => {
  return (
    <div className={classNames("flex flex-row items-center", className)}>
      <div className="rounded-full h-8 w-8 text-[#fff] bg-primary flex justify-center items-center">
        {icon}
      </div>
      <p className="font-bold text-lg text-dark-base pl-4">{title}</p>
    </div>
  );
};

export default GroupTitle;
