import React, { useState } from "react";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import {
  BrandLogoLoading,
  Button,
  Collapser,
  GroupLayout,
  GroupTitle,
  IconButton,
  Pagination,
  Sorting
} from "../../../components";
import {ScheduleHistoriesFilter} from "../../ScheduleMeeting/components";

const ListContact = ({className, t}) => {

  const [isShowFilter, setIsShowFilter] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort_by: "start_date_time",
    order: "desc",
  });
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={classNames([className, "flex flex-col"])}>
      <GroupLayout
        className="flex flex-col w-full"
        titleComponent={
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1">
              <GroupTitle title={t("meeting.meeting_history")} className="!pb-0" />
            </div>
            <div className="space-x-2 py-2 flex flex-row w-auto items-center justify-end">
              <div className="tooltip" data-tip={t("general.filter")}>
                <IconButton
                  onClick={() => {
                    setIsShowFilter(!isShowFilter);
                  }}
                  src="/icons/icons/filter-outline.svg"
                  alt="Filter"
                />
              </div>
              <div className="tooltip" data-tip={t("general.sort")}>
                <button>
                  <IconButton
                    onClick={() => {
                      setSort(!sort);
                    }}
                    src="/icons/icons/sort-outline.svg"
                    alt="Sort"
                  />
                </button>
              </div>
              <div className="tooltip" data-tip={t("general.option")}>
                <IconButton onClick={() => {}} src="/icons/icons/more-outline.svg" alt="Option" />
              </div>
            </div>
          </div>
        }
      >
        <div>
          <Collapser
            show={isShowFilter}
            title={t("schedule_meeting.schedule_histories_filters")}
            content={
              <ScheduleHistoriesFilter
                onChange={(f) => {
                  setFilter({ ...filter, ...f });
                }}
              />
            }
          />
        </div>
        <div className="flex w-full flex-1">
          <div className="overflow-x-auto flex-1 rounded-lg">
            {loading && <BrandLogoLoading />}
            {!loading && (
              <table className="table w-full">
                <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white truncate w-8" width="100">Information</th>
                  <th className="bg-white">Company</th>
                  <th className="bg-white">Position</th>
                  <th className="bg-white">Phone number</th>
                  <th className="bg-white flex justify-end">
                    <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                  </th>
                </tr>
                </thead>
              </table>
            )}
            <div className="py-8 flex justify-center">
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
      </GroupLayout>
    </div>

  );
};

export default withTranslation()(ListContact);
