import React, {useCallback} from "react";

export const renderBox = (title, content, margin = "mb-4") => {
  return (
    <div className={ margin }>
      <p className="text-base text-gray">{ title }</p>
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
