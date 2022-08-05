import classNames from "classnames";
import React from "react";

const GroupTitle = ({ icon, title = "", className }) => {
  return (
    <div className={classNames("flex flex-row w-full items-center pb-5", className)}>
      <p className="font-bold sm:w-full text-lg text-dark-base">{title}</p>
    </div>
  );
};

export default GroupTitle;
