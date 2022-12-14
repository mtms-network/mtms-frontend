import React, {useEffect, useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { Button, message, Popconfirm } from 'antd';
import Checkbox from "../../../components/base/checkbox";
import {getNFTs, getSubscription, setPrimaryNFT, setPrimaryPlan} from "../../../services/orverview.service";
import Pagination from "../../../components/composite/Pagination";
import {renderExpired} from "../config";
import {API_RESPONSE_STATUS} from "../../../configs";

const YourAccountPlan = ({isLoadData, setIsLoadData, loadingPage, setIsLoadNft, setPlanActive}) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 5,
    page: 1,
    sort_by: "id",
    order: "desc",
  });

  const fetchData = async () => {
    const res = await getSubscription(filter);

    await setPagination(
      res?.meta || {}
    );

    res?.data?.forEach((item) => {
      if(item.is_primary === true){
        setPlanActive(item?.subscription?.id);
      }
    });

    await setSubscriptions(
      res?.data || []
    );

    await setIsLoadData(false);
  };

  useEffect(() => {
    if(isLoadData && !loadingPage){
      fetchData().then();
    }
  }, [isLoadData, loadingPage]);

  useEffect(() => {
    if(!isLoadData){
      fetchData().then();
    }
  }, [filter.page]);

  const setPrimary = async (id) => {
    const res = await setPrimaryPlan(id);
    if (res?.status === API_RESPONSE_STATUS.success) {
      await setSubscriptions(subscriptions.map(item => {
        item.is_primary = item.id === id;
        return item;
      }));
      await setIsLoadNft(true);
      await setPlanActive(id);
      message.success("Switch plan success");
    }else{
      message.error("Switch plan fail");
    }
  };

  return (
    <div className="">
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            Your Account Plan
          </p>
          <div className="flex flex-row pt-1 text-black-base">
            You can only activate 1 plan at a time to earn tokens.
          </div>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white"  style={{width: '50px'}}/>
                  <th className="bg-white" style={{width: '25%'}}>Plan</th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>Max earnings</div>
                    (Time/Min)
                  </th>
                  <th className="bg-white text-center" style={{width: '20%'}}>
                    <div>Max Ern/Day</div> (MTMS)
                  </th>
                  <th className="bg-white text-center" style={{width: '200px'}}>
                    <div>E-rate</div> (MTMS/Min)
                  </th>
                  <th className="bg-white" style={{width: '200px'}}/>
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  subscriptions?.map((item, index) => {
                    return (
                      <tr className="text-cl-base text-md border-0 table-row" key={index}>
                        <td className="bg-white w-[40px]">
                          <div className="flex justify-center mt-2 w-[40px]">
                            {
                              item?.is_primary ? <Checkbox label="n" checked={item?.is_primary} name="user_plan" /> : (
                                <Popconfirm
                                  title={
                                    <div>
                                      <div>You need to update your nft.</div>
                                      <div>Are you sure switch plan ?</div>
                                    </div>
                                  }
                                  onConfirm={ async () => {
                                    return new Promise(resolve => {
                                      setTimeout(() => {
                                        setPrimary(item.id);
                                      }, 2000);
                                    });
                                  }}
                                  okText="Yes"
                                  cancelText="No"
                                  onOpenChange={() => {}}
                                >
                                  <Checkbox
                                    label="n"
                                    name="user_plan"
                                    checked={item.is_primary}
                                    onChange={() => {}}
                                  />
                                </Popconfirm>
                              )
                            }

                          </div>
                        </td>
                        <td className="bg-white">
                          <div>{ item?.subscription?.name }</div>
                          { renderExpired(item?.end_at) }
                        </td>
                        <td className="bg-white text-center">
                          <div>30 minutes</div>
                        </td>
                        <td className="bg-white max-w-[150px] truncate text-center">{ item?.subscription?.max_earning_per_day }</td>
                        <td className="bg-white text-center text-center">
                          { item?.subscription?.earning_rate }
                        </td>
                        <td className="bg-white flex justify-center">
                          <button
                            className={classNames('btn btn-primary opacity-50 hover:bg-slate-400 btn-outlined-base hover:cursor-not-allowed')}
                          >
                            Buy More
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
              <div className="py-4 flex justify-end px-6">
                <Pagination
                  page={pagination?.current_page}
                  totalPage={pagination?.last_page}
                  total={pagination?.total}
                  limit={pagination?.per_page}
                  from={pagination?.from}
                  to={pagination?.to}
                  onNext={() => {
                    if (filter.page < pagination?.last_page) {
                      const nextPage = filter.page + 1;
                      setFilter({ ...filter, page: nextPage });
                    }
                  }}
                  onBack={() => {
                    if (filter.page <= pagination?.last_page && filter.page > 1) {
                      const nextPage = filter.page - 1;
                      setFilter({ ...filter, page: nextPage });
                    }
                  }}
                  onPage={(page) => {
                    if (page !== pagination?.current_page) {
                      setFilter({ ...filter, page });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default withTranslation()(YourAccountPlan);

