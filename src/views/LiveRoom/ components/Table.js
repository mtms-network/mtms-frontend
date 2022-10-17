import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BrandLogoLoading, GroupTitle, Pagination} from "../../../components";
import {getListLiveRoom} from "../../../services";
import LiveRoomItem from "./LiveRoomItem";

const Table = ({title= "", filterDefault = {}, isLiveRoom = false}) => {
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    ...filterDefault,
    page: 1,
    limit: 10,
  });
  const [liveRooms, setLiveRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await getListLiveRoom(filter);
    await setLiveRooms(res?.data || []);
    await setPagination(res?.meta || {});
    await setLoading(false);
  };

  useEffect(() => {
    if(loading){
      fetchData().then();
    }
  }, [loading]);

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex justify-center sm:justify-between items-center flex-col sm:flex-row">
        <GroupTitle
          className="sm:pb-0 pb-4 flex justify-center"
          title={title}
        />
        {
          liveRooms?.length > 0 && <Pagination
            page={pagination?.current_page}
            totalPage={pagination?.last_page}
            total={pagination?.total}
            limit={pagination?.per_page}
            from={pagination?.from}
            to={pagination?.to}
            onNext={ async () => {
              if (filter.page < pagination?.last_page) {
                const nextPage = filter.page + 1;
                await setFilter({ ...filter, page: nextPage });
                await setLoading(true);
              }
            }}
            onBack={ async () => {
              if (filter.page <= pagination?.last_page && filter.page > 1) {
                const nextPage = filter.page - 1;
                await setFilter({ ...filter, page: nextPage });
                await setLoading(true);
              }
            }}
            onPage={ async (page) => {
              if (page !== pagination?.current_page) {
                await setFilter({ ...filter, page });
                await setLoading(true);
              }
            }}
          />
        }
      </div>
      {loading && <BrandLogoLoading />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {!loading &&
          liveRooms?.map((item) => (
            <LiveRoomItem
              isLiveRoom={isLiveRoom}
              setIsReload={setLoading}
              data={item}
              key={item?.uuid}
            />
          ))}
      </div>
    </div>
  );
};

export default Table;

