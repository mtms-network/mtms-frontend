import React from "react";

const OverviewNavBar = () => {
  return (
    <div className="flex justify-center sm:justify-between items-center py-2">
      <div
        className="flex flex-col sm:flex-row basis-1/2 sm:basis-full
      sm:space-x-4 space-y-2  sm:space-y-0 justify-center sm:justify-start"
      >
        <button className="btn-link-primary">Instant meeting</button>
        <button className="btn-link-primary">Join meeting</button>
      </div>
      <div
        className="flex flex-col sm:flex-row basis-1/2 sm:basis-full
      sm:space-x-4 space-y-2  sm:space-y-0 justify-center sm:justify-end"
      >
        <button className="btn btn-primary btn-sm text-white">M - Wallet</button>
        <button className="btn btn-primary btn-sm text-white">User Center</button>
      </div>
    </div>
  );
};

export default OverviewNavBar;
