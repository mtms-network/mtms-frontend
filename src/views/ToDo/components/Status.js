import React from "react";

const Status = ({status}) => {
  return (
    <div className="rounded-2xl bg-[#DAEFFF] p-1 w-auto flex items-center color-active cursor-pointer max-w-[10rem]">
      <div className="rounded-full bg-white w-6 h-6 mx-2" /> { status ? "Completed" : "Incomplete" }
    </div>
  );
};

export default Status;
