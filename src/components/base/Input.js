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
  ...rest
}) => {
  return (
    <div className={classNames("relative w-full flex items-center justify-center", containerClass)}>
      <input
        type={type}
        className={classNames(
          "input input-bordered w-full text-black",
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
  isLabelWhite,
  ...rest
}) => {
  return (
    <FormControl
      required={required}
      label={label}
      error={error}
      labelClassName={classNames(isLabelWhite && "!text-white", labelClassName)}
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
