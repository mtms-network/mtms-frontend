import React, {useCallback, useEffect, useState} from "react";
import { MainLayout, Button } from "components";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { CONFIGS, WALLET_ADDRESS } from "configs";
import {getAccessToken} from "helpers";
import Web3 from 'web3';
import {message} from "antd";
import {getBoxesContract, getBoxs, saveOpenBox} from "../../services/orverview.service";
import { getUser } from "../../services";
import {useAppStore} from "../../stores/app.store";
import { YourAccountPlan, YourNFTEarn } from "./components";
import erc20abi from "../../abi/mtms-smartcontract.abi.json";
import BrandLogoLoading from "../../components/composite/BrandLogoLoading";
import {Loading} from "../../components/base/Loading";
import OpenBox from "../../components/base/OpenBox";
import YourVoucher from "./components/YourVoucher";

const Overview = ({ t }) => {
  const [boxes, setBoxes] = useState([]);
  const [appStore, updateAppStore] = useAppStore();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingBox, setLoadingBox] = useState(true);
  const [isReloadNFT, setIsReloadNTF] = useState(true);
  const [isReloadSubscription, setIsReloadSubscription] = useState(true);
  const [isReloadVouchers, setIsReloadVouchers] = useState(true);

  const loadBoxBE = async () => {
    const box = await getBoxs();
    return box;
  };

  const loadBoxSmartContract = async (box) => {
    await setLoadingBox(true);
    const data = await getBoxesContract([...box]);
    await setBoxes([...data]);
    await setLoadingBox(false)
  };

  const fetchData = async () => {
    try {
      const box = await loadBoxBE();
      await loadBoxSmartContract(box);
      setTimeout( async () => {
        await setLoadingPage(false);
      }, 400);
    } catch (error) {
      await setLoadingBox(false)
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

  const reloadData = useCallback(async () => {
    await updateAppStore((store) => {
      store.appendComponentLayout = null;
    });
    await setBoxes([]);
    await setIsReloadNTF(true);
    await setIsReloadSubscription(true);
    await setIsReloadVouchers(true);
    message.success(t("overview.unbox_success"));
    await fetchData();
  }, []);

  const onUnbox = async (box) => {
    try {
      await updateAppStore((store) => {
        store.loadingIcon = true;
        store.loadingIconTitle = t("overview.title_loading");
      });

      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];

      const contract = new web3.eth.Contract(
        erc20abi,
        WALLET_ADDRESS.MUMBOA
      );

      if(!box?.tokenId?.length)
      {
        message.error(t("overview.box_not_found"));
        return null;
      }
      const tId = box.tokenId[0];

      await contract.methods.openBox(tId).send({from: walletAddress});

      const resOpenBox = await saveOpenBox({ tokenId: tId });
      await updateAppStore((store) => {
        store.loadingIcon = false;
        store.appendComponentLayout = <OpenBox
          nft={resOpenBox?.nft?.name}
          voucher={resOpenBox?.voucher?.name}
          subscription={resOpenBox?.nft?.subscription?.name}
          setIsReload={reloadData}
        />;
        store.loadingIconTitle = "";
      });

      box.tokenId.shift();
      box.owning += 1;
      box.available -= 1;
    }catch (err){
      message.error(t("overview.unbox_fail"))
      await updateAppStore((store) => {
        store.loadingIcon = false;
        store.appendComponentLayout = null;
      })
    }

    return true;
  }

  const mintBox = async (isEpicBox = false) => {
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    const walletAddress = accounts[0];

    const contract = new web3.eth.Contract(
      erc20abi,
      WALLET_ADDRESS.MUMBOA
    );
    await contract.methods.mint(isEpicBox, 3).send({from: walletAddress});
  };

  useEffect(() => {
    if(appStore.isAuthenticated){
      fetchData().then();
    }
  }, [appStore.isAuthenticated]);

  return (
    <MainLayout>
      { loadingPage ? (
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

                <Button className="btn btn-primary ml-2" onClick={() => { mintBox(false) }}>
                  Mint Common box
                </Button>

                <Button className="btn btn-primary ml-2" onClick={() => { mintBox(true) }}>
                  Mint epic box
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
                            { loadingBox
                              ? <Loading wrapper={false} />
                              : <>{box?.owning} {t("overview.box")}</>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between flex-col">
                        <div className="px-20 md:px-12 lg:px-8 xl:px-10 flex justify-between	">
                          <div>{t("overview.available_unbox")}</div>
                          <div className={classNames("text-orange-base  font-bold")}>
                            { loadingBox
                              ? <Loading wrapper={false} />
                              : <>{box?.available} {t("overview.box")}</>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classNames("mt-4 flex justify-center")}>
                      <Button disabled={!isActive} className="btn-primary w-40" onClick={ async () => { await onUnbox(box) }}>
                        { loadingBox && <Loading wrapper={false} title="" /> }
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
        <YourAccountPlan isLoadData={isReloadSubscription} setIsLoadData={setIsReloadSubscription} loadingPage={loadingPage} />
      </div>
      <div className="pt-10">
        <YourNFTEarn isLoadData={isReloadNFT} isLoadDataSub={isReloadSubscription} setIsLoadData={setIsReloadNTF} />
      </div>
      <div className="pt-10">
        <YourVoucher isLoadData={isReloadVouchers} isLoadDataNft={isReloadNFT} setIsLoadData={setIsReloadVouchers} />
      </div>
    </MainLayout>
  );
};

export default withTranslation()(Overview);
