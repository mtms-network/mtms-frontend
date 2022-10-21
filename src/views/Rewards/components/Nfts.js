import React, {useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import {message} from "antd";
import {renderCode} from "../../Overview/config";
import {claimNft} from "../../../services/wallet.service";
import {ALERT_TYPE, API_RESPONSE_STATUS} from "../../../configs";
import {handleHttpError} from "../../../helpers";
import {AlertError} from "../../../components";

const Nfts = ({NFTs, reload}) => {

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [loading, setLoading] = useState(false);

  let listNtf = [];
  try {
    listNtf = Object.values(NFTs);
  }catch (err){}

  const handleClaimNft = async (id) => {
    try {
      const res = await claimNft(id);
      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
        if(reload){
          reload();
        }
      }
    }catch (error){
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="">
      <AlertError
        {...{...alert}}
        onClose={() => {
          setAlert({...alert, show: false});
        }}
      />
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            NFTs
          </p>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white" style={{width: '30%'}}>NFT</th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>Power</div>
                    (W)
                  </th>
                  <th className="bg-white text-center" style={{width: '20%'}}>
                    <div>E-rate</div>
                    (MTMS / Min)
                  </th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>TOTAL EARNINGS</div>
                    (MTMS)
                  </th>
                  <th className="bg-white" style={{width: '200px'}}/>
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  listNtf?.length ? listNtf.map((item, index) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={index}>
                      <td className="bg-white">
                        <div className="flex">
                          <div className="flex items-center w-32">
                            <img src={item?.user_nft?.nft?.photo} alt="nft gold"/>
                          </div>
                          <div className="flex flex-col justify-center ml-2">
                            {item?.user_nft?.is_primary ? (
                              <div className="color-active">Active</div>
                            ) : (
                              <div className="color-inactive">Inactive</div>
                            )}
                            <div>{item?.user_nft?.nft?.name}</div>
                            <div className="text-[#0190fe]">{ renderCode(item?.user_nft?.id) }</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-white max-w-[150px] truncate text-center">{item?.user_nft?.final_power}</td>
                      <td className="bg-white text-center">
                        {item?.user_nft?.min_e_rate}
                      </td>
                      <td className="bg-white text-center">
                        {item?.earn_all}
                      </td>
                      <td className="bg-white text-center">
                        <button
                          className={classNames('btn btn-primary hover:bg-primary btn-outlined-base')}
                          onClick={() => { handleClaimNft(item?.user_nft?.id).then(); }}
                        >
                          Claim
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="text-center bg-white text-center">
                        No Data
                      </td>
                    </tr>
                  )
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Nfts);
