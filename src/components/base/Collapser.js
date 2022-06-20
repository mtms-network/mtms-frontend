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
    setIsShow(true);
  }, []);

  return (
    isShow && (
      <GroupLayout>
        <div className="justify-between flex w-full">
          <p className="text-md font-semibold">{title}</p>
          <button
            onClick={() => {
              setIsShow(false);
            }}
          >
            <IoCloseCircle />
          </button>
        </div>
        <div>{content}</div>
      </GroupLayout>
    )
  );
};

export default Collapser;
