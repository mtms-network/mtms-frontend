import React from "react";
import classNames from "classnames";
import FormControl from "./FormControl";

const TextArea = ({ className, label, type, error, register, disabled, required, ...rest }) => {
  return (
    <FormControl required={required} label={label} error={error}>
      <div className="relative">
        <textarea
          type={type}
          className={classNames(
            "textarea h-24 w-full text-black bg-slate-base rounded-lg",
            error && "textarea-error",
            className || "textarea-md",
          )}
          disabled={disabled}
          {...register}
          {...rest}
        />
      </div>
    </FormControl>
  );
};

export default TextArea;
