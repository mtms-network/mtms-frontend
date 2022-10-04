import React, {useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import {message} from "antd";
import {renderExpired} from "../../Overview/config";
import {claimPlan} from "../../../services/wallet.service";
import {ALERT_TYPE, API_RESPONSE_STATUS} from "../../../configs";
import {handleHttpError} from "../../../helpers";
import {AlertError} from "../../../components";

const Plan = ({plan, reload}) => {

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });

  const [loading, setLoading] = useState(false);

  let listPlan = [];
  try {
    listPlan = Object.values(plan);
  }catch (err){}

  const handleClaimPlan = async (id) => {
    try {
      const res = await claimPlan(id);
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

      <div className="">
        <div className="flex flex-row w-full items-center pb-5">
          <div className="flex flex-col w-full">
            <p className="font-bold sm:w-full text-lg text-dark-base">
              Plans
            </p>
            <div className="flex w-full flex-1 mt-2">
              <div className="overflow-x-auto flex-1 rounded-lg bg-white">
                <table className="table w-full">
                  <thead className="border-b-1">
                  <tr className="text-cl-base">
                    <th className="bg-white" style={{width: '30%'}}>Plan</th>
                    <th className="bg-white text-center" style={{width: '15%'}}>
                      <div>E-rate</div>
                      (Time/Min)
                    </th>
                    <th className="bg-white text-center" style={{width: '20%'}}>
                      <div>Max Ern/Day</div> (MTMS/MIN)
                    </th>
                    <th className="bg-white text-center" style={{width: '15%'}}>
                      <div>Total Earnings</div> (MTMS)
                    </th>
                    <th className="bg-white" style={{width: '200px'}}/>
                  </tr>
                  </thead>
                  <tbody className="border-0">
                  {
                    listPlan?.length ? listPlan?.map((item, index) => {
                      return (
                        <tr className="text-cl-base text-md border-0 table-row" key={index}>
                          <td className="bg-white">
                            <div>{ item?.user_subscription?.name }</div>
                            { renderExpired(item?.user_subscription?.end_at) }
                          </td>
                          <td className="bg-white text-center">
                            <div>{ item?.user_subscription?.earning_rate }</div>
                          </td>
                          <td className="bg-white max-w-[150px] truncate text-center">{ item?.user_subscription?.max_earning_per_day }</td>
                          <td className="bg-white text-center text-center">
                            { item?.earn_all }
                          </td>
                          <td className="bg-white flex justify-center">
                            <button
                              className={classNames('btn btn-primary opacity-50 btn-outlined-base')}
                              onClick={() => {
                                handleClaimPlan(item?.user_subscription?.id).then();
                              }}
                            >
                              Claim
                            </button>
                          </td>
                        </tr>
                      );
                    }) : (
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

    </div>
  );
};

export default withTranslation()(Plan);
