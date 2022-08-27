import React, { useState, useMemo } from "react";
import { Button, GroupLayout, GroupTitle, Input, MainLayout, WalletBlockButton } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useAppStore } from "stores/app.store";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";

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

  const handleConnectBinanceWallet = async () => {
    await connectBinance("bsc");
  };

  const handleConnectMetaMaskWallet = async () => {
    const res = await connectMetaMask();
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
          name="Binance"
          src="/icons/binance-logo.png"
          onClick={handleConnectBinanceWallet}
        />
        <WalletBlockButton
          name="Metamask"
          src="/icons/metamask-logo.png"
          onClick={handleConnectMetaMaskWallet}
        />
        <WalletBlockButton
          name="Oasis"
          src="/icons/oasis-logo.png"
          className="opacity-50 hover:border-slate-200 hover:border-transparent"
        />
        <WalletBlockButton
          name="Avalanche"
          src="/icons/avalanche-logo.png"
          className="opacity-50 hover:border-slate-200 hover:border-transparent"
        />
      </div>
    </MainLayout>
  );
};

export default withTranslation()(ConnectWallet);
