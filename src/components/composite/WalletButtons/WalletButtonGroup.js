import React from "react";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { WalletBlockButton } from "components";
import { useAppStore } from "stores/app.store";
import { handleHttpError, setUserInfo } from "../../../helpers";
import { connectWallet } from "../../../services";
import { WALLET_PROVIDER } from "../../../configs";

export function WalletButtonGroup({classNameWrapper}) {
  const [appStore, updateAppStore] = useAppStore();
  const { t } = useTranslation();

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
        wallets: data?.wallets,
        profile: { ...appStore.user.profile, wallets: data?.wallets},
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
    <div className={ classNameWrapper || "grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4"}>
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
  );
}
