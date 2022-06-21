import React from "react";
import classNames from "classnames";

const Button = ({ children, className, isLoading, disabled, ...rest }) => {
  return !isLoading ? (
    <button {...rest} className={classNames("btn", className)}>
      {children}
    </button>
  ) : (
    <button className={classNames("btn bg-primary loading", className)} disabled>
      Processing...
    </button>
  );
};

export default Button;
