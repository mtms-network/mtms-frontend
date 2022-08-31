import React, { useEffect, useState } from "react";
import { MainLayout } from "components";
import { Button, GroupLayout, GroupTitle, Input } from "components";
import { IoCalendarSharp } from "react-icons/io5";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { getBoxs } from "../../services/orverview.service";
const Overview = ({ t }) => {
  const [boxs, setBoxs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let _boxs = await getBoxs();
    await setBoxs(_boxs);
  };
  console.log(boxs);
  return (
    <MainLayout>
      <div className="flex flex-row w-full items-center pb-5">
        <p className="font-bold sm:w-full text-lg text-dark-base">{t("overview.your_mtms_box")}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {boxs.map((box, index) => (
          <div
            key={index}
            className={classNames(
              "p-4 border-group border-white bg-white rounded-2xl flex flex-col flex-1",
              "justify-between min-h-[160px] hover:border-primary hover:bg-light-primary",
            )}
          >
            <div className="flex flex-col w-full flex-1 h-full">
              <img src={box?.photo} className="rounded-lg	bg-black" />
              <div className="text-gray text-lg uppercase text-center mt-4">{box?.name}</div>
              <div className="mt-2">
                <div className="flex justify-between flex-col ">
                  <div className="px-20 md:px-12 lg:px-8 xl:px-10 flex justify-between">
                    <div>{t("overview.owning")}</div>
                    <div className="text-orange-base font-bold">
                      {box.owning} {t("overview.box")}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-col">
                  <div className="px-20 md:px-12 lg:px-8 xl:px-10 flex justify-between	">
                    <div>{t("overview.available_unbox")}</div>
                    <div className="text-orange-base font-bold">
                      {box.avaliable} {t("overview.box")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button disabled={true} className="btn-primary w-40">
                  {t("overview.open_box")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default withTranslation()(Overview);
