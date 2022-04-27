import classNames from "classnames";
import React from "react";

const GroupTitle = ({ icon, title = "", className }) => {
  return (
    <div className={classNames("flex flex-row items-center", className)}>
      {icon && (
        <div className="pr-4">
          <div className="rounded-full h-8 w-8 text-[#fff] bg-primary flex justify-center items-center">
            {icon}
          </div>
        </div>
      )}
      <p className="font-bold text-lg text-dark-base">{title}</p>
    </div>
  );
};

export default GroupTitle;
