import React from "react";
import classNames from "classnames";
import { DatePicker } from "antd";
import FormControl from "./FormControl";

const DateTimePicker = ({
  className,
  label,
  type,
  error,
  disabled,
  required,
  labelClassName,
  isLabelWhite,
  onChange,
  onOk,
  ...rest
}) => {
  return (
    <FormControl
      required={required}
      label={label}
      error={error}
      labelClassName={classNames(isLabelWhite && "!text-white", labelClassName)}
    >
      <DatePicker
        onOk={onOk}
        className={classNames(
          "input input-bordered w-full text-black hover:border-opacity-20 hover:border-slate-300",
          error && "input-error",
          className || "input-md",
        )}
        {...rest}
      />
    </FormControl>
  );
};

export default DateTimePicker;
