import {Modal, Alert, message} from 'antd';
import Web3 from 'web3';
import React, {useState} from "react";
import {Button} from "../../../../../../components";
import {
    CloseOutlined,
    HeartOutlined
} from '@ant-design/icons';
import { Slider, Checkbox } from 'antd';
import {connectMetaMaskWallet, getUser, handleHttpError} from "../../../../../../helpers";
import {useMetaMask} from "metamask-react";
import erc20abi from "../../../../../../abi/mtms-erc20.json";
import {API_RESPONSE_STATUS, WALLET_ADDRESS} from "../../../../../../configs";
import {useTranslation} from "react-i18next";
import styles from "../../index.module.css";
import {giftToHost, giftWithDraw} from "../../../../../../services";

const BtnGiftToHost = ({ meeting }) => {
    const { t } = useTranslation();
    const { connect: connectMetaMask, account: accountMetaMask } = useMetaMask();
    const [sendWithDraw, setSendWithDraw] = useState(true);
    const [token, setToken] = useState(0.2);
    const [open, setOpen] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState("");

    const user = getUser();

    const handleSendToHost = async () => {
        await setLoadingSubmit(true);
        try {
            const web3 = new Web3(window.web3.currentProvider);
            let accounts = await web3.eth.getAccounts();
            if (accounts?.length === 0) {
                const login = await connectMetaMaskWallet(t, connectMetaMask);
                if(login?.accounts?.length){
                    accounts = login.accounts;
                }
            }

            if(accounts?.length){
                const contract = new web3.eth.Contract(
                    erc20abi,
                    WALLET_ADDRESS.MTMS
                );

                const balance = await contract.methods.balanceOf(accounts[0]).call();

                const amount = token  * 10**6;

                if(balance < amount){
                    setError("The number of tokens in your account is not sufficient")
                    return null;
                }else{
                    setError("");
                }

                const gas = await web3.eth.estimateGas({
                    from: accounts[0]
                });


                const tx = {
                    from: accounts[0],
                    to: WALLET_ADDRESS.MTMS,
                    data: contract.methods.transfer(meeting?.user?.wallets[0]?.wallet_address, amount).encodeABI(),
                    gas: gas,
                };

                let transactionHash = null;
                const txResult = await web3.eth.sendTransaction(tx)
                                .then((res) => {
                                    transactionHash = res?.transactionHash;
                                })
                                .catch((err) => {
                                    console.log('err', err);
                                });

                let sendConfirm = null;
                if(transactionHash){
                    sendConfirm = await giftToHost(meeting?.uuid, transactionHash);
                }

                if(sendConfirm?.status === API_RESPONSE_STATUS.success){
                    message.success(`Thank for ${meeting?.user?.profile?.name} success`);
                    setOpen(!open);
                }else{
                    message.error(`Thank for ${meeting?.user?.profile?.name} fail`);
                }

            }
        }catch (err){
            message.error(`Thank for ${meeting?.user?.profile?.name} fail`);
        }

        await setLoadingSubmit(false)

    }

    const handleSendWithDraw = async () => {
        await setLoadingSubmit(true);
        try {
            const res = await giftWithDraw(meeting?.uuid, token);
            if(res?.status === API_RESPONSE_STATUS.success){
                message.success(res?.message);
                setOpen(!open);
            }else{
                message.error(res)
            }
        }catch (err){
            message.error(err);
        }

        await setLoadingSubmit(false);

    }

    const renderStep = () => {
        return token >= 10 ? 1 : .1;
    }

    const renderMin = () => {
        return token >= 10 ? 1 : .1;
    }

    return (
        <>
            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4 flex items-center gap-0.5"
                onClick={() => { setOpen(true); }}
            >
                Thanks host
                <img src="../../../images/logo.png" alt="logo" className="W-5 h-5"/>
            </Button>

            <Modal
                maskClosable={false}
                closable={false}
                visible={open}
                onCancel={() => { setOpen(!open) }}
                footer={null}
                centered
                wrapClassName="no-scrollbar py-10"
            >
                <div>
                    <div className="flex items-center justify-between font-size-lager font-bold">
                        <span className={"flex gap-1"}>Thank <span className={styles.nowrap}> { meeting?.user?.profile?.name }</span></span>
                        <div className={`${styles.closeModalDonat} ${ loadingSubmit ? 'cursor-not-allowed' : 'cursor-pointer' }`}>
                            <CloseOutlined
                                style={{ fontSize: '16px' }}
                                onClick={() => {
                                    if(!loadingSubmit){
                                        setOpen(!open)
                                    }

                                }}
                            />
                        </div>
                    </div>

                    {
                        error?.length ? <Alert className={"my-1"} message={error} type="error" /> : null
                    }

                    <div className="py-1">
                        Buy a Super Thanks, which directly supports { meeting?.user?.profile?.name }.
                    </div>
                    <div>
                        <fieldset className="border border-solid border-gray-300 px-3 pb-3 rounded">
                            <legend className="text-sm w-auto px-1">Bonus</legend>
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-full">
                                    <img src={user?.profile?.avatar} alt={"avatar"} />
                                </div>
                                <div>
                                    <div className={`${styles.nowrap} font-bold`}>{ user?.profile?.name }</div>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex items-center gap-1 rounded-2xl px-2 py-1 bg-pink-500 text-white justify-center">
                                            <HeartOutlined />
                                            <span>
                                                {token}MTMS
                                            </span>
                                        </div>
                                        Thanks!
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="pb-1 pt-2">
                        <Slider
                            marks={{
                                0: 0,
                                10: 10,
                                20: 20,
                                30: 30,
                                40: 40,
                                50: 50,
                            }}
                            step={renderStep()}
                            min={renderMin()}
                            max={50}
                            defaultValue={token}
                            disabled={false}
                            onChange={(event) => {
                                setToken(event);
                            }}
                        />
                    </div>
                    <div className="py-1">
                        As an added bonus, the above public comment will be published on your behalf (subject to Community Guidelines).
                    </div>
                </div>

                <div className="py-1">
                    <Checkbox
                        checked={sendWithDraw}
                        onChange={() => {
                            setSendWithDraw(!sendWithDraw);
                        }}
                    >
                        Send with draw
                    </Checkbox>
                </div>

                <div className="mt-2 flex justify-end">
                    <Button
                        className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 flex items-center justify-end gap-0.5"
                        onClick={ async () => {
                            if(!loadingSubmit){
                               if(sendWithDraw){
                                   await handleSendWithDraw();
                               }else{
                                   await handleSendToHost();
                               }
                            }
                        }}
                        isLoading={loadingSubmit}
                    >
                        Thanks host
                        <img src="../../../images/logo.png" alt="logo" className="W-5 h-5"/>
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default BtnGiftToHost;
