import React from "react";
import classNames from "classnames";

const Button = ({ children, className, isLoading, disabled, ...rest }) => {
  return !isLoading && !disabled ? (
    <button {...rest} className={classNames("btn rounded-[20px] h-[48px] min-h-[48px]", className)}>
      {children}
    </button>
  ) : (
    <button
      {...rest}
      className={classNames(
        "btn rounded-[20px] h-[48px] min-h-[48px] bg-[#DAEFFF] border-0",
        className,
        isLoading && "loading",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
