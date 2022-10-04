import React, {useEffect, useState} from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { Button, message, Popconfirm } from 'antd';
import Checkbox from "../../../components/base/checkbox";
import Pagination from "../../../components/composite/Pagination";
import { getNFTs, setPrimaryNFT } from "../../../services/orverview.service";
import {renderCode} from "../config";
import {API_RESPONSE_STATUS} from "../../../configs";

const YourNFTEarn = ({isLoadData, setIsLoadData, isLoadDataSub}) => {
  const [NFTs, setNFTs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 5,
    page: 1,
    sort_by: "id",
    order: "desc",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);

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
      fetchData().then();
    }
  }, [isLoadData, isLoadDataSub]);

  useEffect(() => {
    if(!isLoadData){
      fetchData().then();
    }
  }, [filter.page]);

  const setPrimary = async (userNft) => {
    const res = await setPrimaryNFT(userNft.id);
    if (res?.status === API_RESPONSE_STATUS.success) {
      await setNFTs(NFTs.map(item => {
        item.is_primary = item.id === userNft.id;
        return item;
      }));

      message.success("Switch nft success");
    }else{
      message.error("Switch nft fail");
    }
  };

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
                  <th className="bg-white" style={{width: '25%'}}>NFT</th>
                  <th className="bg-white text-center" style={{width: '15%'}}>
                    <div>Power</div>
                    (W)
                  </th>
                  <th className="bg-white text-center" style={{width: '20%'}}>
                    <div>Max Ern/Day </div>
                    (MTMS)
                  </th>
                  <th className="bg-white text-center" style={{width: '200px'}}>
                    <div>E-rate</div>
                    (MTMS / Min)
                  </th>
                  <th className="bg-white" style={{width: '200px'}}/>
                </tr>
                </thead>
                <tbody className="border-0">
                {
                  NFTs.map((item, index) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={item.id}>
                      <td className="bg-white w-[40px]">
                        <div className="flex justify-center mt-2 w-[40px]">
                          { item.is_primary === true ? (
                            <Checkbox
                              label="n"
                              name="user_nft"
                              checked={item.is_primary}
                              onChange={() => {
                                console.log('change pk');
                              }}
                            />
                          ) : (
                            <Popconfirm
                              open={openPopConfirm}
                              okButtonProps={{ loading: confirmLoading }}
                              placement="top"
                              title="Are you sure switch nft?"
                              onConfirm={ async () => {
                                await setConfirmLoading(true);
                                await setPrimary(item);
                                setTimeout( async () => {
                                  await setConfirmLoading(false);
                                  await setOpenPopConfirm(false);
                                }, 500);
                              }}
                              onCancel={() => { setOpenPopConfirm(false); }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Checkbox
                                label="n"
                                name="user_nft"
                                checked={item.is_primary}
                                onChange={() => {
                                  console.log('change pk false');
                                }}
                              />
                            </Popconfirm>
                          ) }
                        </div>
                      </td>
                      <td className="bg-white">
                        <div className="flex">
                          <div className="flex items-center w-32">
                            <img src={item?.nft?.photo} alt="nft gold"/>
                          </div>
                          <div className="flex flex-col justify-center ml-2">
                            {item.is_primary ? (
                              <div className="color-active">Active</div>
                            ) : (
                              <div className="color-inactive">Inactive</div>
                            )}
                            <div>{item?.nft?.name}</div>
                            <div className="text-[#0190fe]">{ renderCode(item?.id) }</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-white max-w-[150px] truncate text-center">{item.final_power}</td>
                      <td className="bg-white text-center">
                        {item?.max_earn_per_day}
                      </td>
                      <td className="bg-white text-center">
                        {item?.min_e_rate}
                      </td>
                      <td className="bg-white text-center flex justify-center">
                        <button
                          className={classNames('btn btn-primary opacity-50 hover:bg-slate-400 btn-outlined-base hover:cursor-not-allowed')}
                        >
                          Buy More
                        </button>
                      </td>
                    </tr>
                  ))
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

export default withTranslation()(YourNFTEarn);
