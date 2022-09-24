import React, {useEffect, useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import Checkbox from "../../../components/base/checkbox";
import {getNFTs, getSubscription} from "../../../services/orverview.service";
import Pagination from "../../../components/composite/Pagination";
import moment from "moment";

const YourAccountPlan = ({isLoadData, setIsLoadData}) => {
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

    await setSubscriptions(
      res?.data || []
    );

    await setIsLoadData(false);
  };

  useEffect(() => {
    if(isLoadData){
      console.log('load s')
      fetchData().then();
    }
  }, [isLoadData]);

  useEffect(() => {
    if(!isLoadData){
      fetchData().then();
    }
  }, [filter.page]);

  const renderExpired = (item) => {
    const days = moment(item?.expired_at).diff(moment(), 'days');

    if(days > 0){
      return <span className="text-xs">Expire at: {days} days</span>;
    }

    return <span className="text-xs color-danger">Expired: {moment(item?.expired_at).format("DD-MM-YYYY")}</span>;
  };

  return (
    <div className="">
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            Your Account Plan
          </p>
          <div className="flex flex-row pt-1 text-black-base">
            You can only active 1 Account Plan to earn token
          </div>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white" />
                  <th className="bg-white">NFT</th>
                  <th className="bg-white text-center">
                    <div>Max Ern/Day</div> (MTMS)
                  </th>
                  <th className="bg-white text-center">
                    <div>E-rate</div> (MTMS/Min)
                  </th>
                  <th className="bg-white" />
                  <th className="bg-white" />
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  subscriptions?.map((item, index) => {
                    return (
                      <tr className="text-cl-base text-md border-0 table-row" key={index}>
                        <td className="bg-white">
                          <div className="flex justify-center mt-2">
                            <Checkbox label="n" checked="checked" name="radio" />
                          </div>
                        </td>
                        <td className="bg-white">
                          <div>{ item?.subscription?.name }</div>
                          { renderExpired(item) }
                        </td>
                        <td className="bg-white max-w-[150px] truncate text-center">{ item?.subscription?.max_earning_per_day }</td>
                        <td className="bg-white text-center">
                          { item?.subscription?.earning_rate }
                        </td>
                        <td className="bg-white">
                          <button
                            className={classNames('btn btn-primary btn-outlined-base')}
                          >
                            Buy More
                          </button>
                        </td>
                        <td className="bg-white">
                          <img src="/icons/icons/arrow-right-outline.svg" alt="arrow right" />
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

