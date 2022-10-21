import React, {useState} from "react";
import classNames from "classnames";
import {message} from "antd";
import {renderCode, renderExpired} from "../../Overview/config";
import {claimVoucher} from "../../../services/wallet.service";
import {ALERT_TYPE, API_RESPONSE_STATUS} from "../../../configs";
import {handleHttpError} from "../../../helpers";
import {AlertError} from "../../../components";

const Vouchers = ({vouchers, reload}) => {

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [loading, setLoading] = useState(false);


  let listVouchers = [];
  try {
    listVouchers = Object.values(vouchers);
  }catch (err){}

  const handleClaimVoucher = async (id) => {
    try {
      const res = await claimVoucher(id);
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
            Vouchers
          </p>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white" style={{width: '30%'}}>Voucher</th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>NFT Earned</div> (MTMS)
                  </th>
                  <th className="bg-white text-center" style={{width: '20%'}}>
                    Earn
                  </th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    Expire
                  </th>
                  <th className="bg-white" style={{width: '200px'}}/>
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  listVouchers?.length ? listVouchers?.map((item, index) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={index}>
                      <td className="bg-white max-w-[150px] truncate text-left">
                        <div>{item?.user_voucher?.name}</div>
                        <div className="text-[#0190fe] text-xs">{ renderCode(item?.user_voucher?.user_nft_id) }</div>
                      </td>
                      <td className="bg-white text-center">{ item?.earn_all || 0 }</td>
                      <td className="bg-white text-center">{ Number(item?.earn_all) }</td>
                      <td className="bg-white text-center">
                        { renderExpired(item?.user_voucher?.end_at, "") }
                      </td>
                      <td className="bg-white text-right flex justify-center">
                        <button
                          className={classNames('btn btn-primary hover:bg-primary btn-outlined-base')}
                          onClick={() => { handleClaimVoucher(item?.user_voucher?.id).then(); }}
                        >
                          Claim
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="bg-white text-center">
                        No data
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

export default Vouchers;
