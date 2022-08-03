import classNames from "classnames";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { withTranslation } from 'react-i18next';

const Pagination = ({
  page = 1,
  totalPage = 1,
  total = 1,
  from = 1,
  to = 1,
  className,
  onNext = () => { },
  onBack = () => { },
  t,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col sm:flex-row items-center justify-between w-full right-8",
        className,
      )}
    >
      <div className="pb-2 sm:pb-0">
        <p className="text-md text-dark-base">{t('global.total_result_found_with_record', { attribute: total, from: from || 0, to: to || 0 })}</p>
      </div>

      <div className="pl-0 sm:pl-4">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <p className="text-dark-base">{t('general.page')}</p>
          <input
            disabled
            maxLength={4}
            placeholder="1"
            className="input input-primary !bg-primary !text-black w-16 text-center max-w-xs border-0"
            value={page}
          />
          <p className="text-dark-base">{`of ${totalPage}`}</p>
          <button
            className="btn btn-square btn-ghost btn-active text-black"
            onClick={onBack}
            disabled={page === 1}
          >
            <IoChevronBack />
          </button>
          <button
            className="btn btn-square btn-ghost btn-active text-black"
            onClick={onNext}
            disabled={page === totalPage}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Pagination);
