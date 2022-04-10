import React from "react";
import classnames from "classnames";
import FormControl from "./FormControl";

export const InputSingle = ({
  type = "text",
  error,
  className,
  disabled,
  register,
  containerClass,
  ...rest
}) => {
  return (
    <div className={classnames("relative", containerClass)}>
      <input
        type={type}
        className={classnames(
          "input input-bordered text-base-content w-full",
          error && "input-error",
          className || "input-md",
        )}
        disabled={disabled}
        {...register}
        {...rest}
      />
    </div>
  );
};

const Input = ({ className, label, type, error, register, disabled, required, ...rest }) => {
  return (
    <FormControl required={required} label={label} error={error}>
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
