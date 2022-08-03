import { GroupLayout } from "components/composite";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const Collapser = ({
  show = false,
  title,
  titleStyle,
  content,
  contentStyle,
  icon,
  isShowIcon,
}) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(!isShow);
  }, [show]);

  return (
    isShow && (
      <GroupLayout className="delay-700 pl-0 pr-0 pt-0">
        <div className="justify-between flex w-full">
          <p className="text-md font-semibold">{title}</p>
          <button
            className="btn btn-circle btn-xs group bg-transparent border-0 hover:bg-red-500"
            onClick={() => {
              setIsShow(false);
            }}
          >
            <IoCloseCircle className="group-hover:text-white text-black " size={20} />
          </button>
        </div>
        <div>{content}</div>
      </GroupLayout>
    )
  );
};

export default Collapser;
