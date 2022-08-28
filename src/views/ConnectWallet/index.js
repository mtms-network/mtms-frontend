import React, { useState, useMemo } from "react";
import { Button, GroupLayout, GroupTitle, Input, MainLayout, WalletBlockButton } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useAppStore } from "stores/app.store";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import { WALLET_PROVIDER } from "configs";
import { connectWallet } from "services";

const ConnectWallet = ({ t }) => {
  const [appStore, updateAppStore] = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    account: accountBinance,
    connect: connectBinance,
    reset,
    status,
    balance,
    chainId,
  } = useWallet();
  const { connect: connectMetaMask, account: accountMetaMask } = useMetaMask();

  const handleValidWallet = (data) => {
    try {
      // setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      // updateAppStore((draft) => {
      //   draft.isAuthenticated = true;
      //   draft.user = data?.user;
      // });
    } catch (error) {}
  };

  const handleConnectBinanceWallet = async () => {
    const res = await connectBinance("bsc");
    console.log("res", res);
  };

  const handleConnectMetaMaskWallet = async () => {
    try {
      const res = await connectMetaMask();
      if (res) {
        const data = await connectWallet({
          walletAddress: res[0],
          provider: WALLET_PROVIDER.metamask.type,
        });
        if (data) {
          handleValidWallet(data);
        }
      }
    } catch (error) {}
  };
  return (
    <MainLayout>
      <GroupTitle title="Connect Your Wallet" />
      <div className="pb-10">
        <p className="text-md">Select wallet you want to connect below.</p>
        <p className="text-error text-md">You can not change your wallet after connected.</p>
      </div>
      <div className="flex flex-row space-x-5">
        <WalletBlockButton
          name="Metamask"
          src="/icons/metamask-logo.png"
          onClick={handleConnectMetaMaskWallet}
        />
        <WalletBlockButton
          name="Binance"
          src="/icons/binance-logo.png"
          className="opacity-20 hover:border-slate-200 hover:border-transparent"
        />
        <WalletBlockButton
          name="Oasis"
          src="/icons/oasis-logo.png"
          className="opacity-20 hover:border-slate-200 hover:border-transparent"
        />
        <WalletBlockButton
          name="Avalanche"
          src="/icons/avalanche-logo.png"
          className="opacity-20 hover:border-slate-200 hover:border-transparent"
        />
      </div>
    </MainLayout>
  );
};

export default withTranslation()(ConnectWallet);
