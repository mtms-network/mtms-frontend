import {WALLET_NETWORK} from "../configs";
import Web3 from "web3";
import {message} from "antd";
import {getMessageKey} from "../services";

export const checkMatchNetwork = () => {
    // return true;
    return Number(window.ethereum?.networkVersion) === WALLET_NETWORK.mumbai;
};

export const connectMetaMaskWallet = async (t, connectMetaMask) => {
    try {
        const walletMessageKey = "wallet_message_key";

        const web3 = new Web3(window.web3.currentProvider);
        if(!checkMatchNetwork()){
            message.error("You must connect Renkeby network");
            return "";
        }

        let accounts = await web3.eth.getAccounts();
        if(!accounts || accounts?.length === 0){
            accounts = await connectMetaMask();
        }

        const resMessageKey = await getMessageKey();

        if(!resMessageKey?.data_sign){
            message.error({ content: "Cannot get message key", key: walletMessageKey });
            return "";
        }

        const sign = await web3.eth.personal.sign(resMessageKey?.data_sign, accounts[0], resMessageKey?.data_sign);

        message.loading({ content: `${t("global.loading")} ...`, key: walletMessageKey });

        return {
            data: await connectMetaMask(),
            sign: sign,
            resMessageKey: resMessageKey,
            accounts: accounts,
        };
    }catch (err) {
        return null;
    }
}
