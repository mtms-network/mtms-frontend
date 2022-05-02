import classNames from "classnames";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({ limit = 1, page = 1, totalPage = 1, from = 1, to = 1, className }) => {
  return (
    <div
      className={classNames("flex flex-row items-center justify-between w-full right-8", className)}
    >
      <div>
        <p className="text-lg text-dark-base">{`Total ${
          limit * totalPage
        } result found - showing records from ${from} to ${to}`}</p>
      </div>

      <div className="pl-4">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <p className="text-dark-base">Page</p>
          <input
            maxLength={4}
            placeholder="1"
            className="input input-primary bg-primary text-white w-16 text-center max-w-xs"
          />
          <p className="text-dark-base">{`of ${totalPage}`}</p>
          <button className="btn btn-square btn-ghost btn-active text-black">
            <IoChevronBack />
          </button>
          <button className="btn btn-square btn-ghost btn-active text-black">
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
