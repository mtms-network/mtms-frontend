import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WalletButtonGroup } from "components";
import { useAppStore } from "stores/app.store";
import { WALLET_PROVIDER } from "../../configs";

export default function UserWallet() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [appStore, updateAppStore] = useAppStore();
  const walletAddress = appStore?.user?.wallets?.[0]?.wallet_address;
  const walletType = WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.name;

  return !walletAddress ? (
    <WalletButtonGroup />
  ) : (
    <div className="flex flex-row border-1 h-auto p-3 rounded-2xl">
      {walletAddress ? (
        <div className="pr-4 items-center flex">
          <img
            src={WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.image}
            alt="wallet-logo"
            className="h-fit w-fit max-h-10 max-w-10"
          />
        </div>
      ) : (
        ""
      )}
      <div className="truncate">
        <p className="text-lg text-gray">{`${walletType} wallet`}</p>
        <span className="font-bold text-lg text-black-base truncate ">{`${walletAddress || ""}`}</span>
      </div>
    </div>
  );
}
