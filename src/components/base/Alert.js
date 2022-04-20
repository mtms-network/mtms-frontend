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

const Alert = ({
  showIcon = false,
  type = ALERT_TYPE.INFO,
  message = "",
  show = false,
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
      <div {...rest} className={classNames("alert shadow-lg rounded-lg", config.className)}>
        <div className="flex flex-1 justify-between">
          {showIcon && <config.icon />}
          <span>{message}</span>
          <button onClick={onClose} className="justify-end">
            <IoClose />
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
