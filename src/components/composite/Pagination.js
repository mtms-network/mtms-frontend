/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import classNames from "classnames";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { withTranslation } from "react-i18next";

const Pagination = ({
  page = 1,
  totalPage = 1,
  total = 1,
  from = 1,
  to = 1,
  className,
  onNext = () => {},
  onBack = () => {},
  onPage,
  t,
}) => {
  let start = page;
  let end;
  const html = [];
  if (page > 1) {
    start = page - 1;
    if (page > 3) {
      html.push(
        <>
          <div
            onClick={() => onPage(1)}
            className="rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer"
          >
            1
          </div>
          <div>...</div>
        </>,
      );
    }
  }

  if (page > totalPage - 2) {
    start = totalPage - 2;
  }

  end = start + 3;
  if (end > totalPage + 1) {
    end = totalPage + 1;
  }

  for (let i = start; i < end; i++) {
    html.push(
      <div
        abc={i}
        key={i}
        onClick={() => {
          onPage(i);
        }}
        className={`rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer${
          page === i ? " bg-primary text-white" : ""
        }`}
      >
        {i}
      </div>,
    );
  }

  if (page < totalPage - 2) {
    html.push(
      <>
        <div>...</div>
        <div
          onClick={() => onPage(totalPage)}
          className="rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer"
        >
          {totalPage}
        </div>
      </>,
    );
  }
  return (
    <div
      className={classNames("flex flex-col sm:flex-row items-center justify-between", className)}
    >
      <div className="pl-0 sm:pl-4">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <button
            className={classNames("bg-transparent hover:text-primary", )}
            onClick={onBack}
            disabled={page === 1}
          >
            <IoChevronBack />
          </button>
          {html}
          <button
            className="bg-transparent hover:text-primary"
            onClick={onNext}
            disabled={page === totalPage}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Pagination);
