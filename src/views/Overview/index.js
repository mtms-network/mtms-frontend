import React, { useEffect, useState } from "react";
import { MainLayout, Button, GroupLayout, GroupTitle, Input } from "components";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { BOXES, CONFIGS } from "configs";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUser } from "helpers";
import { getBoxs } from "../../services/orverview.service";

const Overview = ({ t }) => {
  const [boxes, setBoxes] = useState([]);
  const [isDefaultBoxes, setIsDefaultBoxes] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getBoxs();
      if (data && data.length) {
        setBoxes(data);
        setIsDefaultBoxes(false);
      } else {
        setBoxes(BOXES);
      }
    } catch (error) {}
  };

  const onBuyBox = () => {
    const token = getAccessToken();
    const user = getUser();

    let params = "";
    if (token) {
      params = `?t=${token}`;
      if (user?.wallets?.length) {
        params += `&w=${user.wallets[0]?.wallet_address}`;
      }

      window.location = `${CONFIGS.boxUrl}${params}`;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            {t("overview.your_mtms_box")}
          </p>
          <div className="flex flex-row pt-2">
            <Button className="btn btn-primary" onClick={onBuyBox}>
              <img src="/icons/icons/add-white-user-fill.svg" alt="buy mtms" className="pr-2" />
              {t("blindBox.buy_box")}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
          isDefaultBoxes && "opacity-50",
        )}
      >
        {boxes.map((box, index) => (
          <div
            key={index}
            className={classNames(
              "p-4 border-group border-white bg-white rounded-2xl flex flex-col flex-1",
              "justify-between min-h-[160px] hover:border-primary hover:bg-light-primary",
              isDefaultBoxes && "grayscale hover:border-white",
            )}
          >
            <div className="flex flex-col w-full flex-1 h-full">
              <img src={box.photo} className={classNames("rounded-lg bg-black")} alt="box" />
              <div className="text-gray text-lg uppercase text-center mt-4">{box?.name}</div>
              <div className="mt-2">
                <div className="flex justify-between flex-col ">
                  <div className="px-20 md:px-12 lg:px-8 xl:px-10 flex justify-between">
                    <div>{t("overview.owning")}</div>
                    <div className={classNames("text-orange-base font-bold")}>
                      {box?.owning} {t("overview.box")}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-col">
                  <div className="px-20 md:px-12 lg:px-8 xl:px-10 flex justify-between	">
                    <div>{t("overview.available_unbox")}</div>
                    <div className={classNames("text-orange-base  font-bold")}>
                      {box?.avaliable} {t("overview.box")}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames("mt-4 flex justify-center")}>
                <Button disabled className="btn-primary w-40">
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
