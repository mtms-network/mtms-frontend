import React from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import Checkbox from "../../../components/base/checkbox";

const YourNFTEarn = ({t}) => {
  return (
    <div className="container">
      <div className="flex flex-row w-full items-center pb-5">
        <div className="flex flex-col w-full">
          <p className="font-bold sm:w-full text-lg text-dark-base">
            Your NFT Earn
          </p>
          <div className="flex flex-row pt-1 text-black-base">
            You can only active 1 NFT Earn to earn token
          </div>
          <div className="flex w-full flex-1 mt-2">
            <div className="overflow-x-auto flex-1 rounded-lg">
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
                <tr className="text-cl-base text-md border-0 table-row">
                  <td className="bg-white">
                    <div className="flex justify-center mt-2">
                      <Checkbox label="n" checked="checked" name="radio" />
                    </div>
                  </td>
                  <td className="bg-white">
                    <div className="flex">
                      <div>
                        <img src="/icons/nft-gold.png" alt="nft gold"/>
                      </div>
                      <div className="flex flex-col justify-center ml-2">
                        <div className="color-inactive">Inactive</div>
                        <div>NFT Gold</div>
                      </div>
                    </div>
                  </td>
                  <td className="bg-white max-w-[150px] truncate">0.02</td>
                  <td className="bg-white">
                    0.7
                  </td>
                  <td className="bg-white">
                    0.7
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default withTranslation()(YourNFTEarn);
