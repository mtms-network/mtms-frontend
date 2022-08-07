import React from "react";
import classnames from "classnames";

const FormControl = ({
  label,
  error,
  children,
  className,
  center = false,
  required,
  labelClassName,
  labelRightComponent,
}) => {
  return (
    <div className={classnames("form-control", className)}>
      <div>
        {label && (
          <div className="pb-1 flex items-center justify-between">
            <p className={classnames("label-text text-black", labelClassName)}>
              {label}
              {required && <span className="inline-block ml-1 text-error">*</span>}
            </p>
            {labelRightComponent && labelRightComponent}
          </div>
        )}
      </div>

      {children}
      {error && (
        <label className={classnames("label py-1 pb-0", center && "justify-center")}>
          <span className={classnames("label-text-alt text-error")}>
            {error.message || error.type}
          </span>
        </label>
      )}
    </div>
  );
};

export default FormControl;
