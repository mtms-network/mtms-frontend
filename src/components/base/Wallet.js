import React, { useState } from "react";
import { WalletButton } from "components";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import {getMessageKey, signInWallet} from "services";
import { routeUrls, WALLET_PROVIDER } from "configs";
import { useNavigate } from "react-router-dom";
import { setTokenLoginSucceeded } from "helpers";
import { useAppStore } from "stores/app.store";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import Web3 from "web3";

const Wallet = () => {
  const {
    account: accountBinance,
    connect: connectBinance,
    reset,
    status,
    balance,
    chainId,
  } = useWallet();
  const { connect: connectMetaMask, account: accountMetaMask } = useMetaMask();
  const navigate = useNavigate();
  const [, updateAppStore] = useAppStore();
  const { t } = useTranslation();

  const walletMessageKey = "wallet_message_key";

  const handleValidWallet = (data) => {
    try {
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      updateAppStore((draft) => {
        draft.isAuthenticated = true;
        draft.user = data?.user;
      });
      navigate("/");
    } catch (error) {}
  };

  const handleConnectBinanceWallet = async () => {
    const res = await connectBinance("bsc");
    console.log("res", res);
  };

  const handleConnectMetaMaskWallet = async () => {
    try {
      const web3 = new Web3(window.web3.currentProvider);

      let accounts = await web3.eth.getAccounts();
      if(!accounts || accounts?.length === 0){
        accounts = await connectMetaMask();
      }

      const resMessageKey = await getMessageKey();

      if(!resMessageKey?.data_sign){
        message.error({ content: "Cannot get message key", key: walletMessageKey });
        return "";
      }

      const sign = await web3.eth.personal.sign(resMessageKey?.data_sign, accounts[0], resMessageKey?.data_sign);

      message.loading({ content: `${t("global.loading")} ...`, key: walletMessageKey });
      const res = await connectMetaMask();
      if (res.length) {
        const data = await signInWallet({
          walletAddress: resMessageKey.id,
          provider: WALLET_PROVIDER.metamask.type,
          signId: sign
        });
        await handleValidWallet(data);
      } else {
        throw new Error(t("global.could_not_find", { attribute: "Metamask" }));
      }
    } catch (error) {
      message.error({ content: error.message, key: walletMessageKey });
    }
  };

  return (
    <>
      <WalletButton
        name="Metamask"
        src="/icons/metamask-logo.png"
        onClick={handleConnectMetaMaskWallet}
      />
      <WalletButton
        name="Binance"
        src="/icons/binance-logo.png"
        className="opacity-20 hover:border-transparent"
      />
      <WalletButton
        name="Oasis"
        src="/icons/oasis-logo.png"
        className="opacity-20 hover:border-transparent"
      />
      <WalletButton
        name="Avalanche"
        src="/icons/avalanche-logo.png"
        className="opacity-20 hover:border-transparent"
      />
    </>
  );
};

export default Wallet;
