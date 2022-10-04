import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Checkbox from "../../../components/base/checkbox";
import Pagination from "../../../components/composite/Pagination";
import {getVouchers} from "../../../services/orverview.service";
import {renderCode} from "../config";

const YourVoucher = ({isLoadData, setIsLoadData, isLoadDataNft}) => {

  const [vouchers, setVouchers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 5,
    page: 1,
    sort_by: "id",
    order: "desc",
  });

  const fetchData = async () => {
    const res = await getVouchers(filter);
    const data = res?.data || [];
    await setVouchers(
      [...data]
    );

    await setPagination(
      res?.meta || {}
    );

    await setIsLoadData(false);
  };

  useEffect(() => {
    if(isLoadData && !isLoadDataNft){
      fetchData().then();
    }
  }, [isLoadData, isLoadDataNft]);

  useEffect(() => {
    if(!isLoadData){
      fetchData().then();
    }
  }, [filter.page]);
  console.log('v', vouchers)
  return (
    <div className="">
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            Your Vouchers
          </p>
          <div className="flex flex-row pt-1 text-black-base">
            You can only active 1 Vouchers Earn to earn token
          </div>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white" style={{width: '50px'}} />
                  <th className="bg-white" style={{width: '25%'}}>Voucher</th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>NFT Earned</div> (MTMS)
                  </th>
                  <th className="bg-white text-center" style={{width: '20%'}}>
                    <div>Power</div> (X Time)
                  </th>
                  <th className="bg-white text-center" style={{width: '200px'}}>
                    <div>Voucher (Estimate </div> total MTMS tokens)
                  </th>
                  <th className="bg-white" style={{width: '200px'}}/>
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  [...vouchers]?.map((item, index) => {
                    if(item?.user_nft?.is_primary){
                      console.log(index, item?.user_nft?.is_primary)
                    }
                    return (
                      <tr className="text-cl-base text-md border-0 table-row" key={index}>
                        <td className="bg-white w-[40px]">
                          <div className="flex justify-center mt-2 w-[40px]">
                            <Checkbox key={index} label="n" checked={ item?.user_nft?.is_primary } name="radio" />
                          </div>
                        </td>

                        <td className="bg-white max-w-[150px] truncate text-left">
                          <div>{item?.voucher?.name}</div>
                          <div className="text-[#0190fe] text-xs">{ renderCode(item?.user_nft?.id) }</div>
                        </td>
                        <td className="bg-white text-center">{ item?.estimated_token || 0 }</td>
                        <td className="bg-white text-center">{item?.voucher?.power}</td>
                        <td className="bg-white text-center">{ item?.estimated_token || 0 }</td>
                        <td className="bg-white text-right flex justify-center">
                          <button
                            className={classNames('btn btn-primary opacity-50 hover:bg-slate-400 btn-outlined-base hover:cursor-not-allowed')}
                          >
                            Claim
                          </button>
                        </td>
                      </tr>
                    )
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
  );
};

export default YourVoucher;
