import moment from "moment";
import React from "react";

const arrFieldSort = [
  { label: "Type", value: "type" },
  { label: "Code", value: "code" },
  { label: "Status", value: "status" },
  { label: "Start date", value: "start_date_time" },
];

export const ConfigOverview = {
  arrFieldSort,
};

export const renderExpired = (expired_at, size="text-xs") => {
  if (!expired_at) {
    return '';
  }

  const days = moment(expired_at).diff(moment(), 'days');

  if(days > 0){
    return <span className={size}>Expire at: {days} days</span>;
  }

  return <span className="text-xs color-danger">Expired: {moment(expired_at).format("DD-MM-YYYY")}</span>;
};

export const renderCode = (id) => {
  return `#M${id?.toString()?.padStart(5, '0')}`;
};

