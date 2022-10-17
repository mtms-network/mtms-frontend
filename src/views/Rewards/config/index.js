import React, {useCallback} from "react";
import moment from "moment";

export const renderBox = (title, content, margin = "mb-4") => {
  return (
    <div className='mb-4' >
      <p className="text-base text-gray uppercase">{ title }</p>
      <p className="text-orange-base font-bold text-xl">
        { content }
      </p>
    </div>
  );
};

export const convertTime = (totalMinute) => {
  const h = Math.floor(totalMinute / 60);
  const m = totalMinute - h * 60;
  return {
    h: h?.toString().padStart(2, "0"),
    m: m?.toString()?.padStart(2, "0"),
  };
};

export const renderCountdown = (date) => {
  if (!date) {
    return null;
  }

  const diffSeconds = moment(date).diff(moment(), 'seconds');

  if (diffSeconds <= 0) {
    return null;
  }

  const diffValue = {
    'd': Math.floor(diffSeconds / (24 * 3600)),
    'h': Math.floor((diffSeconds % (24 * 3600)) / 3600),
    'm': Math.floor((diffSeconds % 3600) / 60),
    's': diffSeconds % 60,
  };

  return Object.keys(diffValue).reduce((prev, key) => {
    if (prev) {
      return `${prev}:${diffValue[key]}${key}`;
    }

    if (diffValue[key] > 0) {
      return `${diffValue[key]}${key}`;
    }

    return prev;
  }, null);
};
