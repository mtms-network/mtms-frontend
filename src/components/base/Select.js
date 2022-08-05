import React from "react";
import classNames from "classnames";
import { Select as SelectBase } from "antd";
import FormControl from "./FormControl";

const Select = ({
  className,
  label,
  type,
  error,
  register,
  disabled,
  required,
  options = [],
  onChange,
  defaultValue,
  placeholder,
  value,
  allowClear,
  ...rest
}) => {
  const { Option } = SelectBase;

  return (
    <FormControl required={required} label={label} error={error}>
      <SelectBase
        {...rest}
        bordered={false}
        className={classNames(
          "w-full text-black bg-slate-base",
          "input rounded-full",
          "flex items-center",
          "ml-0 pl-0",
          error && "input-error",
          className || "input-md",
        )}
        defaultValue={defaultValue}
        placeholder={placeholder || `Select ${label}`}
        onChange={onChange}
        allowClear
      >
        {options.map((item) => (
          <Option key={item?.key} value={item?.key}>
            {item?.value}
          </Option>
        ))}
      </SelectBase>
    </FormControl>
  );
};

export default Select;
