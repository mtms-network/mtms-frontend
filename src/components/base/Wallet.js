import React, { useState } from "react";
import { WalletButton } from "components";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import {getMessageKey, signInWallet} from "services";
import {routeUrls, WALLET_ADDRESS, WALLET_NETWORK, WALLET_PROVIDER} from "configs";
import { useNavigate } from "react-router-dom";
import {checkMatchNetwork, connectMetaMaskWallet, setTokenLoginSucceeded} from "helpers";
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

  const handleValidWallet = (data) => {
    try {
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      updateAppStore((draft) => {
        draft.isAuthenticated = true;
        draft.user = data?.user;
      });
      navigate(`/${routeUrls.exploreRoom.path}`);
    } catch (error) {}
  };

  const handleConnectMetaMaskWallet = async () => {
    try {
      const res = await connectMetaMaskWallet(t, connectMetaMask);
      if (res?.data?.length) {
        const data = await signInWallet({
          walletAddress: res?.resMessageKey?.id,
          provider: WALLET_PROVIDER.metamask.type,
          signId: res?.sign
        });
        await handleValidWallet(data);
      } else {
        throw new Error(t("global.could_not_find", { attribute: "Metamask" }));
      }

      return "";
    } catch (error) {
      message.error({ content: error.message, key: "Connect to wallet fail" });
    }
  };

  return (
    <>
      <WalletButton
        name="Metamask"
        src="/icons/metamask-logo.png"
        onClick={handleConnectMetaMaskWallet}
      />
      {/* <WalletButton */}
      {/*   name="Binance" */}
      {/*   src="/icons/binance-logo.png" */}
      {/*   className="opacity-20 hover:border-transparent" */}
      {/* /> */}
      {/* <WalletButton */}
      {/*   name="Oasis" */}
      {/*   src="/icons/oasis-logo.png" */}
      {/*   className="opacity-20 hover:border-transparent" */}
      {/* /> */}
      {/* <WalletButton */}
      {/*   name="Avalanche" */}
      {/*   src="/icons/avalanche-logo.png" */}
      {/*   className="opacity-20 hover:border-transparent" */}
      {/* /> */}
    </>
  );
};

export default Wallet;
