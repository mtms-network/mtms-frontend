import React from "react";
import classNames from "classnames";

const Button = ({ children, className, isLoading, disabled, ...rest }) => {
  return !isLoading ? (
    <button {...rest} className={classNames("btn", className)}>
      {children}
    </button>
  ) : (
    <button className={classNames("btn bg-primary", className)} disabled>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014"
        />
      </svg>
      Processing...
    </button>
  );
};

export default Button;
