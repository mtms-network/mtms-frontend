import React from "react";
import classNames from "classnames";

const Button = ({ children, className, isLoading, disabled, ...rest }) => {
  return !isLoading ? (
    <button {...rest} className={classNames("btn rounded-2xl", className)}>
      {children}
    </button>
  ) : (
    <button className={classNames("btn rounded-2xl bg-primary loading", className)} disabled>
      {children}
    </button>
  );
};

export default Button;
