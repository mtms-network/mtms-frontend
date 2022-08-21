import React from "react";
import { TimePicker as Timer } from "antd";
import classNames from "classnames";

export default function TimePicker({ className, error, ...rest }) {
  return (
    <Timer
      {...rest}
      className={classNames(
        "input w-full text-black bg-slate-base rounded-full hover:border-opacity-20 hover:border-slate-300",
        error && "input-error",
        className || "input-md",
      )}
    />
  );
}
