import React, { useState, useMemo } from "react";
import { Button, GroupLayout, GroupTitle, Input, MainLayout, WalletBlockButton } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useAppStore } from "stores/app.store";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import { WALLET_PROVIDER } from "configs";
import { connectWallet } from "services";
import { handleHttpError, setUserInfo } from "helpers";
import { message } from "antd";

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
      const newUser = {
        ...appStore.user,
        profile: { ...appStore.use.profile, wallets: data },
      };
      setUserInfo({ user: newUser });
      updateAppStore((draft) => {
        draft.user = newUser;
      });
    } catch (error) {}
  };

  const handleConnectBinanceWallet = async () => {
    const res = await connectBinance("bsc");
    console.log("res", res);
  };

  const handleConnectMetaMaskWallet = async () => {
    const connectWalletKey = "connect_wallet_key";
    try {
      message.loading({ content: `${t("global.loading")} ...`, key: connectWalletKey });
      const res = await connectMetaMask();
      if (res.length) {
        const data = await connectWallet({
          walletAddress: res[0],
          provider: WALLET_PROVIDER.metamask.type,
        });
        await handleValidWallet(data);
      } else {
        throw new Error(t("global.could_not_find", { attribute: "Metamask" }));
      }
    } catch (error) {
      message.error({
        content: handleHttpError(error)?.detail?.wallet_address || error?.message,
        key: connectWalletKey,
      });
    }
  };
  return (
    <MainLayout>
      <GroupTitle title={t("wallet.connect_your_wallet")} />
      <div className="pb-10">
        <p className="text-md">{t("wallet.message_connect")}</p>
        <p className="text-error text-md">{t("wallet.message_connect_error")}</p>
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
