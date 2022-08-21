import React from "react";
import { InputNumber as InputNum } from "antd";
import classNames from "classnames";

export default function InputNumber({ className, error, ...rest }) {
  return (
    <InputNum
      {...rest}
      className={classNames(
        "input w-full text-black bg-slate-base rounded-full hover:border-opacity-20 hover:border-slate-300",
        error && "input-error",
        className || "input-md",
      )}
    />
  );
}
