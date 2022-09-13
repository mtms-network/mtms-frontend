import React, { useEffect, useState } from "react";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoCloseCircleOutline,
  IoClose,
} from "react-icons/io5";
import classNames from "classnames";
import { ALERT_TYPE } from "configs";

const AlertError = ({
  showIcon = false,
  type = ALERT_TYPE.INFO,
  message = "",
  show = false,
  error = {},
  onClose = () => {},
  ...rest
}) => {
  const [config, setConfig] = useState({
    icon: IoInformationCircleOutline,
    className: "",
  });

  useEffect(() => {
    switch (type) {
      case ALERT_TYPE.INFO: {
        setConfig({
          icon: IoInformationCircleOutline,
          className: "alert-info",
        });
        break;
      }
      case ALERT_TYPE.SUCCESS: {
        setConfig({
          icon: IoCheckmarkCircleOutline,
          className: "alert-success",
        });
        break;
      }
      case ALERT_TYPE.WARNING: {
        setConfig({
          icon: IoWarningOutline,
          className: "alert-warning",
        });
        break;
      }
      case ALERT_TYPE.ERROR: {
        setConfig({
          icon: IoCloseCircleOutline,
          className: "alert-error",
        });
        break;
      }
      default: {
        setConfig({
          icon: IoCloseCircleOutline,
          className: "alert-info",
        });
        break;
      }
    }
  }, [message]);

  return (
    show &&
    message && (
      <div
        {...rest}
        className={classNames("alert shadow-lg rounded-lg relative", config.className)}
      >
        <div className="block">
          {showIcon && <config.icon />}
          <span>{message}</span>

          {Object.keys(error).length > 0 && (
            <ul className="list-disc ml-[20px]">
              {Object.keys(error).map((key) => (
                <li id={key}>{error[key]}</li>
              ))}
            </ul>
          )}
          <button onClick={onClose} className="absolute right-[10px] top-[15px]">
            <IoClose />
          </button>
        </div>
      </div>
    )
  );
};

export default AlertError;
