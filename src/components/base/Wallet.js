import React from "react";
import { GoogleButton, WalletButton } from "components";
import { useWallet } from 'react-binance-wallet';
import { createPrivateInstance } from "services/base";
import { useMetaMask } from "metamask-react";

const Wallet = () => {
  const { account: accountBinance, connect: connectBinance, reset, status, balance, chainId } = useWallet();
  const { connect: connectMetaMask, account: accountMetaMask } = useMetaMask();

  const handleConnectBinaceWallet = async () => {
    await connectBinance('bsc');

    // const client = createPrivateInstance('/meetings');
    // const res = await client.post("", {accountBinance});
    // console.log(res);
  };

  const handleConnectMetaMaskWallet = async () => {
    const res = await connectMetaMask();
    console.log(res);
  };

  return (
    <>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">Login To Your Account</p>
        <div className="flex flex-row w-full pt-1">
          <p className="pr-2 text-xs">Don’t have an account?</p>
          <a className="btn-text-primary text-xs">
            Register
          </a>
        </div>
      </div>
      <div className="pt-6">
        <p className="text-black-base text-lg font-bold pb-3">Log In With Social</p>
        <GoogleButton showTitle />
      </div>
      <div>
        <div className="divider mt-2 mb-2 text-hint">Or</div>
        <p className="text-black-base text-lg font-bold pb-3 pt-4">Log In With Crypto Wallet</p>
        <div className="flex flex-row space-x-4">
          <WalletButton name="Oasis" src="/icons/oasis-logo.png" />
          <WalletButton name="Avalanche" src="/icons/avalanche-logo.png" />
          <WalletButton name="Binance" src="/icons/binance-logo.png" onClick={handleConnectBinaceWallet} />
          <WalletButton name="Metamask" src="/icons/metamask-logo.png" onClick={handleConnectMetaMaskWallet} />
        </div>
      </div>
    </>
  );
};

export default Wallet;
