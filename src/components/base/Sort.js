import React from "react";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsCheckLg } from "react-icons/bs";

const Sort = ({ onSort, sortBy, order, contentField, ...rest }) => {
  const renderField = () => {
    return contentField.map((item, index) => {
      return (
        <a
          className="block w-full py-2 px-4 clear-both	whitespace-normal	bg-transparent border-0 hover:bg-gray-100"
          key={index}
          onClick={() => {
            onSort("sort_by", item.value);
          }}
        >
          <div className="flex justify-between items-center">
            {item.label} {item.value === sortBy ? <BsCheckLg /> : null}
          </div>
        </a>
      );
    });
  };

  const renderOrder = () => {
    const arrOrder = [
      { label: "Ascending", value: "asc", icon: BsSortAlphaDown },
      { label: "Descending", value: "desc", icon: BsSortAlphaDownAlt },
    ];
    return arrOrder.map((item, index) => {
      return (
        <a
          className="block w-full py-2 px-4 clear-both	whitespace-normal	bg-transparent border-0 hover:bg-gray-100"
          key={index}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => {
              onSort("order", item.value);
            }}
          >
            <div className="flex items-center">
              <item.icon className="mr-2 " />
              {item.label}
            </div>

            {item.value === order ? <BsCheckLg /> : null}
          </div>
        </a>
      );
    });
  };

  return (
    <div className="relative">
      <ul className="block dropdown-sm show-dropdown-up absolute top-full right-0 float-left z-50 min-w-[10rem] py-2 px-0 my-1 mx-0 text-left list-none bg-white bg-clip-padding border rounded-lg shadow-lg">
        <div className="dropdown-menu-items-wrapper scroll">
          <div className="dropdown-menu-items-content">
            <div className="h-full w-full relative overflow-hidden">
              <div className="relative box-border overflow-hidden h-full">
                <div className="relative box-border min-w-full	min-h-full w-full">
                  {renderOrder()}
                  <div className="height-0 my-2 mx-0 overflow-hidden border-t border-slate-100" />
                  {renderField()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Sort;
