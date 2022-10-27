import React from "react";
import classNames from "classnames";
import { Select as SelectBase, Tag } from "antd";
import FormControl from "./FormControl";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<img src="/icons/icons/close-fill.svg" alt="close-icon" />}
      className="bg-secondary text-primary rounded-xl flex flex-row justify-center items-center my-1"
    >
      {label}
    </Tag>
  );
};

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
  multiTag,
  ...rest
}) => {
  const { Option } = SelectBase;

  return (
    <FormControl required={required} label={label} error={error}>
      <SelectBase
        {...rest}
        tagRender={multiTag && tagRender}
        bordered={false}
        className={classNames(
          "w-full text-black bg-slate-base min-h-6 h-auto px-8 py-2",
          "input rounded-full",
          "flex items-center",
          "ml-0 pl-0",
          error && "input-error",
          className,
          multiTag && "rounded-2xl",
        )}
        defaultValue={defaultValue}
        placeholder={placeholder || `${label}`}
        onChange={onChange}
        allowClear
        value={value}
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
