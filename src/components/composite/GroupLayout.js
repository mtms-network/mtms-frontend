import React from "react";
import classNames from "classnames";

const GroupLayout = ({ children, className }) => {
  return <div className={classNames("p-4 border-group", className)}>{children}</div>;
};

export default GroupLayout;
