import React, {useEffect, useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import Checkbox from "../../../components/base/checkbox";
import Pagination from "../../../components/composite/Pagination";
import {getNFTs} from "../../../services/orverview.service";

const YourNFTEarn = ({isLoadData, setIsLoadData, isLoadDataSub}) => {
  const [NFTs, setNFTs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 5,
    page: 1,
    sort_by: "id",
    order: "desc",
  });

  const fetchData = async () => {
    const res = await getNFTs(filter);

    await setPagination(
      res?.meta || {}
    );

    await setNFTs(
      res?.data || []
    );

    await setIsLoadData(false);
  };
  useEffect(() => {
    if(isLoadData && !isLoadDataSub){
      console.log('c')
      fetchData().then();
    }
  }, [isLoadData]);

  useEffect(() => {
    if(!isLoadData){
      console.log('call')
      fetchData().then();
    }
  }, [filter.page]);

  return (
    <div className="">
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            Your NFT Earn
          </p>
          <div className="flex flex-row pt-1 text-black-base">
            You can only active 1 NFT Earn to earn token
          </div>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg bg-white">
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white" />
                  <th className="bg-white">NFT</th>
                  <th className="bg-white text-center">
                    <div>Power</div>
                    (W)
                  </th>
                  <th className="bg-white text-center">
                    <div>Max Ern/Day </div>
                    (MTMS)
                  </th>
                  <th className="bg-white text-center">
                    <div>E-rate</div>
                    (MTMS / Min)
                  </th>
                  <th className="bg-white" />
                  <th className="bg-white" />
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  NFTs.map((item, index) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={index}>
                      <td className="bg-white">
                        <div className="flex justify-center mt-2">
                          <Checkbox label="n" checked="checked" name="radio" />
                        </div>
                      </td>
                      <td className="bg-white">
                        <div className="flex">
                          <div>
                            <img className="w-32" src={item?.nft?.photo} alt="nft gold"/>
                          </div>
                          <div className="flex flex-col justify-center ml-2">
                            <div className="color-inactive">Inactive</div>
                            <div>{ item?.nft?.name }</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-white max-w-[150px] truncate text-center">{item.power}</td>
                      <td className="bg-white text-center">
                        {item?.max_e_rate}
                      </td>
                      <td className="bg-white text-center">
                        {item?.min_e_rate}
                      </td>
                      <td className="bg-white text-center">
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
                  ))
                }
                </tbody>
              </table>
              <div className="py-8 flex justify-end px-6">
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

export default withTranslation()(YourNFTEarn);
