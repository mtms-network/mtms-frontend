import React, { useState, useMemo } from "react";
import {Button, GroupLayout, GroupTitle, Input, MainLayout, UserWallet, WalletBlockButton} from "components";
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
  return (
    <MainLayout>
      <GroupTitle title={t("wallet.connect_your_wallet")} />
      <div className="pb-10">
        <p className="text-md">{t("wallet.message_connect")}</p>
        <p className="text-error text-md">{t("wallet.message_connect_error")}</p>
      </div>
      <UserWallet />
    </MainLayout>
  );
};

export default withTranslation()(ConnectWallet);
