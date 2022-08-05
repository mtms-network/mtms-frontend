import React from "react";
import classNames from "classnames";

const GroupLayout = ({ children, className, titleComponent = "" }) => {
  return (
    <>
      {titleComponent}
      <div className={classNames("p-4 border-group border-white bg-white rounded-2xl", className)}>
        {children}
      </div>
    </>
  );
};

export default GroupLayout;
