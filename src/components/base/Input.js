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
  rightButton,
  ...rest
}) => {
  return (
    <div className={classnames("relative flex items-center justify-center", containerClass)}>
      <input
        type={type}
        className={classnames(
          "input input-bordered w-full max-w-xs text-[#000]",
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
