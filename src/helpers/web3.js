import {WALLET_NETWORK} from "../configs";

export const checkMatchNetwork = () => {
    return true;
    //return Number(window.ethereum?.networkVersion) === WALLET_NETWORK.mumbai;
};
