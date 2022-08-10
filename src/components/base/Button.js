import React from "react";
import classNames from "classnames";

const Button = ({ children, className, isLoading, disabled, ...rest }) => {
  return !isLoading && !disabled ? (
    <button {...rest} className={classNames("btn rounded-[20px] h-[40px] min-h-[40px]", className)}>
      {children}
    </button>
  ) : (
    <button
      className={classNames(
        "btn rounded-[20px] h-[40px] min-h-[40px] bg-[#DAEFFF] border-0",
        className,
        isLoading && "loading",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
