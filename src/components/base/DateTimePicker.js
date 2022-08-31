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
  onChangeDateTime,
  ...rest
}) => {
  return (
    <FormControl
      required={required}
      label={label}
      error={error}
      labelClassName={classNames(isLabelWhite && "!text-black", labelClassName)}
    >
      <DatePicker
        className={classNames(
          "input w-full text-black bg-slate-base rounded-full hover:border-opacity-20 hover:border-slate-300",
          error && "input-error",
          className || "input-md",
        )}
        {...rest}
        onChange={onChangeDateTime}
      />
    </FormControl>
  );
};

export default DateTimePicker;
