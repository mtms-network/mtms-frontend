import React from "react";
import classNames from "classnames";
import FormControl from "./FormControl";

export const InputSingle = ({
  type = "text",
  error,
  className,
  disabled,
  register,
  containerClass,
  rightButton,
  leftIcon,
  ...rest
}) => {
  return (
    <div className={classNames("relative w-full flex items-center justify-center", containerClass)}>
      <div className="absolute left-3">{leftIcon}</div>
      <input
        type={type}
        className={classNames(
          leftIcon && "pl-12",
          "input input-bordered w-full text-black bg-slate-base border-0 rounded-full",
          error && "input-error",
          className || "input-md",
        )}
        disabled={disabled}
        {...register}
        {...rest}
      />

      <div className="absolute right-4">{rightButton}</div>
    </div>
  );
};

const Input = ({
  className,
  label,
  type,
  error,
  register,
  disabled,
  required,
  labelClassName,
  labelRightComponent,
  isLabelWhite,
  ...rest
}) => {
  return (
    <FormControl
      required={required}
      label={label}
      error={error}
      labelRightComponent={labelRightComponent}
      labelClassName={classNames(isLabelWhite && "!text-black", labelClassName)}
    >
      <InputSingle
        type={type}
        error={error}
        className={className}
        disabled={disabled}
        register={register}
        {...rest}
      />
    </FormControl>
  );
};

export default Input;
