import React from "react";
import { WalletButton } from "components";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";
import { signInWallet } from "services";
import { routeUrls, WALLET_PROVIDER } from "configs";
import { useNavigate } from "react-router-dom";
import { setTokenLoginSucceeded } from "helpers";
import { useAppStore } from "stores/app.store";

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
      const res = await connectMetaMask();
      if (res) {
        const data = await signInWallet({
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
