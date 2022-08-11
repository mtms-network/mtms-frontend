import React from "react";
import { useNavigate } from "react-router-dom";
import { WalletProvider } from "react-binance-wallet";
import { MetaMaskProvider } from "metamask-react";

export default function GuestFormLayout({ children }) {
  const navigate = useNavigate();

  return (
    <WalletProvider>
      <MetaMaskProvider>
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col justify-center bg-blue-base pl-20 pr-12 min-h-screen">
            <div>
              <button onClick={() => navigate("/")}>
                <img className="h-14" src="/images/mtms-logo-white.png" alt="logo" />
              </button>
            </div>
            <div>
              <p className="text-white font-bold text-4xl pt-16">{`THE FIRST AND ONLY
                MEET & EARN PLATFORM`}</p>
              <p className="text-white text-base pt-4">MTMS: More Time, More Savings</p>
            </div>
            <div>
              <img src="/images/welcome.png" alt="welcome" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center px-20 bg-white min-h-screen">
            <div className="">{children}</div>
          </div>
        </div>
      </MetaMaskProvider>
    </WalletProvider>
  );
}
