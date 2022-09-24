import {WALLET_NETWORK} from "../configs";

export const checkMatchNetwork = () => {
  return Number(window.ethereum?.networkVersion) === WALLET_NETWORK.mumbai;
};
