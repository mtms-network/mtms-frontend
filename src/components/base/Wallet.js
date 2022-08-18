import React from "react";
import { WalletButton } from "components";
import { useWallet } from "react-binance-wallet";
import { useMetaMask } from "metamask-react";

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

  const handleConnectBinanceWallet = async () => {
    await connectBinance("bsc");

    // const client = createPrivateInstance('/meetings');
    // const res = await client.post("", {accountBinance});
    // console.log(res);
  };

  const handleConnectMetaMaskWallet = async () => {
    const res = await connectMetaMask();
  };

  return (
    <>
      <WalletButton
        name="Binance"
        src="/icons/binance-logo.png"
        onClick={handleConnectBinanceWallet}
      />
      <WalletButton
        name="Metamask"
        src="/icons/metamask-logo.png"
        onClick={handleConnectMetaMaskWallet}
      />
      <WalletButton
        name="Oasis"
        src="/icons/oasis-logo.png"
        className="opacity-50 hover:border-slate-200"
      />
      <WalletButton
        name="Avalanche"
        src="/icons/avalanche-logo.png"
        className="opacity-50 hover:border-slate-200"
      />
    </>
  );
};

export default Wallet;
