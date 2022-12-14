/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import classNames from "classnames";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { withTranslation } from "react-i18next";

const Pagination = ({
  page = 1,
  totalPage = 1,
  className,
  onNext = () => {},
  onBack = () => {},
  onPage,
  t,
}) => {
  let start = page;
  let end;
  const html = [];
  if (totalPage > 1) {
    if (page > 1) {
      start = page - 1;
      if (page > 3) {
        html.push(
          <div className="flex items-center" key={-2}>
            <div
              onClick={() => onPage(1)}
              className="rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer"
            >
              1
            </div>
            <div>...</div>
          </div>,
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
  } else {
    html.push(
      <div
        key={-1}
        onClick={() => onPage(1)}
        className="rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-primary text-white"
      >
        1
      </div>,
    );
  }

  if(start === 0){
    start +=1;
  }

  for (let i = start; i < end; i++) {
    html.push(
      <div
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

  if (page < totalPage - 2 && totalPage > 4) {
    html.push(
      <div key={(Date.now())} className="flex items-center">
        <div>...</div>
        <div
          onClick={() => onPage(totalPage)}
          className="rounded-full w-[36px] h-[36px] flex justify-center items-center cursor-pointer"
        >
          {totalPage}
        </div>
      </div>,
    );
  }

  return (
    <div
      className={classNames("flex flex-col sm:flex-row items-center justify-between", className)}
    >
      <div className="pl-0 sm:pl-4">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <button
            className={classNames(
              "bg-transparent hover:text-primary",
              page === 1 && "cursor-not-allowed text-slate-200 hover:text-slate-200",
            )}
            onClick={onBack}
            disabled={page === 1}
          >
            <IoChevronBack />
          </button>
          {html}
          <button
            className={classNames(
              "bg-transparent hover:text-primary",
              page === totalPage && "cursor-not-allowed text-slate-200 hover:text-slate-200",
            )}
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
