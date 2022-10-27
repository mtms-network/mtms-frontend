import React, {useState, useEffect, useCallback} from "react";
import {Button, MainLayout, AlertError, BrandLogoLoading} from "components";

import {ALERT_TYPE, API_RESPONSE_STATUS, routeUrls, WALLET_PROVIDER} from "configs";
import {useWalletStore} from "stores/wallet.store";
import {getUser, handleHttpError} from "helpers";
import {useTranslation} from "react-i18next";
import {
  checkInToday,
  claimCheckIn,
  getRequirePreWallet,
  confirmWithdraw,
} from "services/wallet.service";
import {message} from "antd";
import {useAppStore} from "stores/app.store";
import {useNavigate} from "react-router-dom";
import Nfts from "./components/Nfts";
import Plan from "./components/Plan";
import Vouchers from "./components/Vouchers";
import Overviews from "./components/Overview";
import Web3 from 'web3';
import AIRDROP_ABI from "../../abi/mtms_airdrop.json";
import { renderCountdown } from "./config"
import moment from "moment";


const Rewards = () => {
  const [walletStore, updateWalletStore] = useWalletStore();
  const [appStore, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [timeMonth, setTimeMonth] = useState({hour: 0, minute: 0});
  const [timeToday, setTimeToday] = useState({hour: 0, minute: 0});
  const [timeWeek, setTimeWeek] = useState({hour: 0, minute: 0});
  const {t} = useTranslation();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [countdown, setCountdown] = useState(null);

  const prepareData = async () => {
    try {
      setFetchLoading(true);
      const res = await getRequirePreWallet();
      if (res) {
        updateWalletStore((draft) => {
          draft.wallet = res;
        });

        checkWithdraw(res);
      }
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const handleClaimCheckInToday = async () => {
    try {
      setAlert({...alert, show: false, message: ""});
      setLoading(true);

      const res = await claimCheckIn();

      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
      }
      await prepareData();
      await setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
      }
      setLoading(false);
    }
  };

  const handleCheckInToday = async () => {
    try {
      setAlert({...alert, show: false, message: ""});
      setLoading(true);

      const res = await checkInToday();
      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
      }

      await prepareData();
      await setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletStore.wallet !== null) {
      const hourMonth = Math.floor(walletStore.wallet.total_minute_month / 60);
      const minuteMonth = walletStore.wallet.total_minute_month % 60;

      const hourToday = Math.floor(walletStore.wallet.total_minute_today / 60);
      const minuteToday = walletStore.wallet.total_minute_today % 60;

      const hourWeek = Math.floor(walletStore.wallet.total_minute_week / 60);
      const minuteWeek = walletStore.wallet.total_minute_week % 60;

      setTimeMonth({hour: hourMonth, minute: minuteMonth});
      setTimeToday({hour: hourToday, minute: minuteToday});
      setTimeWeek({hour: hourWeek, minute: minuteWeek});
    }
    prepareData();
  }, []);

  useEffect(() => {
    const userData = walletStore?.wallet?.user;

    if (!userData) {
      return;
    }

    const needRefresh = moment(userData.next_withdraw_at).isAfter(moment());

    const countdownInterval = setInterval(() => {
      const countdownStr = renderCountdown(userData.next_withdraw_at);

      setCountdown(countdownStr);

      if (!countdownStr) {
        clearInterval(countdownInterval);

        if (needRefresh && userData.total_token) {
          prepareData();
        }
      }
    }, 1000);

    return ()=> {
      clearInterval(countdownInterval);
    };
  }, [walletStore?.wallet?.user]);

  const reload = useCallback(async () => {
    await prepareData();
  }, [])

  const withdraw = async () => {
    const withdrawData = walletStore?.wallet?.user?.withdraw_available;

    if (withdrawAmount == 0 || !withdrawData) {
      return;
    }

    await setLoading(true);

    try {
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
    
      const contract = new web3.eth.Contract(
        AIRDROP_ABI,
        withdrawData.contract_address
      );

      const txt = await contract.methods.claimWeek(
        withdrawData.amountInWei,
        withdrawData.proof
      ).send({ from: walletAddress });
  
      await confirmWithdraw({
        allocation_id: withdrawData.uuid,
        transaction_hash: txt.transactionHash
      });

      await prepareData();

      await setLoading(false);
    } catch (error) {
      await setLoading(false);
    }
  }

  const checkWithdraw = async (data) => {
    const withdrawData = data?.user?.withdraw_available;

    if (!withdrawData) {
      setWithdrawAmount(0);
      return;
    }

    try {
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
    
      const contract = new web3.eth.Contract(
        AIRDROP_ABI,
        withdrawData.contract_address
      );
  
      const claimed = await contract.methods
        .claimed(withdrawData.trancheId, walletAddress)
        .call({ from: walletAddress });
  
      setWithdrawAmount(claimed ? 0 : withdrawData.amount);
    } catch (error) {}
  }

  const totalCredit = () => Number(
    ((walletStore?.wallet?.user?.total_token || 0) + withdrawAmount).toFixed(3)
  );

  return (
    <MainLayout>
      <div className="p-2 min-h-full">
        <AlertError
          {...{...alert}}
          onClose={() => {
            setAlert({...alert, show: false});
          }}
        />
        {fetchLoading && (
          <div className="h-screen">
            <BrandLogoLoading/>
          </div>
        )}
        <div className="space-y-6">
          <div className="flex w-full bg-white rounded-3xl py-6 px-8">
            <div className="flex flex-1 flex-col sm:flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-2xl">{t("rewards.daily_task")}</p>
                <p className="text-base">
                  {`${t("rewards.receive_token", {
                    token: walletStore?.wallet?.token_per_checkin || 0,
                  })}`}
                </p>
              </div>
              <div className="flex flex-row items-end space-x-2 py-4">
                <Button
                  className="btn-primary"
                  isLoading={loading}
                  onClick={async () => {
                    if (!walletStore?.wallet?.has_checked_today) {
                      await handleCheckInToday();
                    }
                  }}
                  disabled={walletStore?.wallet?.has_checked_today}
                >
                  {walletStore?.wallet?.has_checked_today
                    ? t("rewards.checked_in")
                    : t("rewards.check_in")}
                </Button>
                <Button
                  className="btn-primary"
                  disabled={walletStore?.wallet?.total_checkin_token <= 0}
                  isLoading={loading}
                  onClick={() => {
                    if (walletStore?.wallet?.total_checkin_token > 0) {
                      handleClaimCheckInToday();
                    }
                  }}
                >
                  {`${t("rewards.claim_value_token", {
                    token: walletStore?.wallet?.total_checkin_token || 0,
                  })}`}
                </Button>
              </div>
            </div>
          </div>
          <Overviews />
          <Plan plan={walletStore?.wallet?.subscriptions || []} reload={reload} />
          <Nfts NFTs={walletStore?.wallet?.nfts || []} reload={reload}/>
          <Vouchers vouchers={walletStore?.wallet?.vouchers || []} reload={reload}/>
          <div className="flex flex-col sm:flex-row w-full sm:space-x-5">
            <div className="basis-2/3 bg-white rounded-3xl py-6 px-8 grow">
              <div className="flex flex-1 flex-row justify-between">
                <div style={{lineBreak: 'anywhere'}}>
                  <div className="flex flex-row">
                    {appStore?.user?.wallets?.[0]?.wallet_address ? (
                      <div className="pr-4">
                        <img
                          src={WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.image}
                          alt="wallet-logo"
                          className="h-12"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <p className="text-lg text-gray">
                        {appStore?.user?.wallets?.[0]?.wallet_address
                          ? `${
                            WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.name
                          } wallet`
                          : t("rewards.your_wallet")}
                      </p>
                      <span className="font-bold text-lg text-black-base">
                        {`${appStore?.user?.wallets?.[0]?.wallet_address || ""}`}
                      </span>
                      {!appStore?.user?.wallets?.[0]?.wallet_address && (
                        <a
                          onClick={() => {
                            navigate(`/${routeUrls.connectWallet.path}`);
                          }}
                          className="btn-text-primary text-lg"
                        >
                          {t('rewards.connect_wallet')}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-base pt-5">
                    {t("rewards.well_done", {
                      name: getUser()?.profile?.name,
                    })}
                  </p>

                  <p className="text-base pt-5">{t("rewards.slogan")}</p>
                  <p className="text-base pt-5">
                    {t("rewards.message_receive_token", {
                      hours: timeWeek.hour,
                      token: walletStore?.wallet?.total_token_week || 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-1/3 bg-white rounded-3xl py-6 px-8 mt-10 sm:mt-0">
              <div className="flex flex-col justify-center items-center">
                <div className="bg-slate-base flex justify-center items-center px-3 py-4 rounded-xl w-[100%]">
                  <img src="/images/mtms-token.png" className="w-[25px] h-[25px]" alt="logo mtms" />
                  <span className="text-base text-gray ml-2 font-medium">{ t("rewards.total_credit")}</span>
                  <span className="font-bold text-xl ml-2">
                    {totalCredit()} MTMS
                  </span>
                </div>

                <div className="bg-slate-base flex flex-col justify-center items-center px-3 py-4 rounded-xl w-[100%] mt-2">
                  <span className="text-gray font-medium">{t("rewards.withdraw_available")}</span>
                  <div className="flex items-center">
                    <img src="/images/mtms-token.png" className="w-[25px] h-[25px]" alt="logo mtms" />
                    <span className="font-bold text-2xl ml-2">
                        {withdrawAmount || 0} MTMS
                    </span>
                  </div>
                </div>

                <Button
                  className="btn btn-primary rounded-xl btn-lg w-[100%] mt-2"
                  disabled={withdrawAmount == 0}
                  isLoading={loading}
                  onClick={() => withdraw()}
                >
                  { t("rewards.withdraw")}
                </Button>

                { withdrawAmount == 0 && walletStore?.wallet?.user?.total_token > 0 && countdown && (
                  <Button className="btn btn-primary rounded-xl btn-lg w-[100%] mt-2" disabled={true}>
                    { t("rewards.next_withdraw")}: { countdown }
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Rewards;
