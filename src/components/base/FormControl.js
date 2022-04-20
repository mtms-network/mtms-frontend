import React from "react";
import classnames from "classnames";

const FormControl = ({ label, error, children, className, center = false, required }) => {
  return (
    <div className={classnames("form-control", className)}>
      {label && (
        <label className="label">
          <p className="label-text text-white">
            {label}
            {required && <span className="inline-block ml-1 text-error">*</span>}
          </p>
        </label>
      )}
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
