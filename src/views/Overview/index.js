import React, { useEffect, useState } from "react";
import { MainLayout, Button, GroupLayout, GroupTitle, Input } from "components";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import {BOXES, CONFIGS, WALLET_ADDRESS} from "configs";
import { useNavigate } from "react-router-dom";
import {getAccessToken} from "helpers";
import Web3 from 'web3';
import {message} from "antd";
import {getBoxesContract, getBoxs, saveOpenBox} from "../../services/orverview.service";
import { getUser } from "../../services";
import {useAppStore} from "../../stores/app.store";
import { YourAccountPlan, YourNFTEarn } from "./components";
import erc20abi from "../../abi/mtms-smartcontract.abi.json";
import BrandLogoLoading from "../../components/composite/BrandLogoLoading";

const Overview = ({ t }) => {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();
  const [appStore, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await setLoading(true);
      const boxBE = await getBoxs();
      const data = await getBoxesContract([...boxBE]);
      await setBoxes([...data]);
      await setLoading(false)
    } catch (error) {
      console.log('err',error);
    }
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

  const onUnbox = async (box) => {
    try {
      await updateAppStore((store) => {
        store.loadingIcon = true;
      })
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];

      const contract = new web3.eth.Contract(
        erc20abi,
        WALLET_ADDRESS.RINKEBY_ETH
      );

      if(!box?.tokenId?.length)
      {
        message.error("Can not found available box");
        return null;
      }
      const tId = box.tokenId[0];

      await contract.methods.openBox(tId).send({from: walletAddress});
      await saveOpenBox({ tokenId: tId, blindboxId: box.id });
      await updateAppStore((store) => {
        store.loadingIcon = false;
      })
      await setBoxes([]);
      await fetchData();

      message.success("Unbox success");
    }catch (err){
      console.log('err: Can not unbox',);
    }

    return true;
  }

  useEffect(() => {
    if(appStore.isAuthenticated){
      fetchData();
    }
  }, [appStore.isAuthenticated]);

  return (
    <MainLayout>
      { loading ? (
        <div className="overflow-x-auto flex-1 rounded-lg">
          <BrandLogoLoading />
        </div>
      ) : (
        <div>
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
              "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            )}
          >
            {boxes.map((box, index) => {
              const isActive = box.available > 0;
              return (
                <div
                  key={index}
                  className={classNames(
                    "p-4 border-group border-white bg-white rounded-2xl flex flex-col flex-1",
                    "justify-between min-h-[160px] hover:border-primary hover:bg-light-primary",
                    !isActive && "opacity-50",
                    !isActive && "grayscale hover:border-white",
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
                            {box?.available} {t("overview.box")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classNames("mt-4 flex justify-center")}>
                      <Button disabled={!isActive} className="btn-primary w-40" onClick={ async () => { await onUnbox(box) }}>
                        {t("overview.open_box")}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) }


      <div className="pt-10">
        <YourAccountPlan />
      </div>
      <div className="pt-10">
        <YourNFTEarn />
      </div>
    </MainLayout>
  );
};

export default withTranslation()(Overview);
