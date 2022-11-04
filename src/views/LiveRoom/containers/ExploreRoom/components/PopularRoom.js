import React, {useEffect, useState} from "react";
import ListRoom from "./ListRoom";
import {getPublicLiveRoom} from "../../../../../services";
import {BrandLogoLoading, GroupTitle, Pagination} from "../../../../../components";

const PopuplarRoom = ({ roomType, keyword }) => {
    const [filter, setFilter] = useState({
        page: 1,
        limit: 12,
        status: 'schedule',
        roomType: roomType,
        keyword: '',
        sort_by: 'total_likes'
    })
    const [pagination, setPagination] = useState({})
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await setLoading(true);
        const res = await getPublicLiveRoom(filter);
        await setRooms(res?.data || []);
        await setPagination(res?.meta);
        await setLoading(false);
    }

    useEffect(() => {
        if(loading){
            fetchData().then();
        }
    }, [loading])

    useEffect(() => {
        setFilter({
            ...filter,
            roomType: roomType,
            keyword: keyword,
            page: 1,
        })
        setLoading(true)
    }, [roomType, keyword])

    return (
        <div className="">
            <div className="flex justify-between">
                <GroupTitle
                    className="sm:pb-0 pb-4 flex justify-center"
                    title={"Popular Rooms"}
                />
                {
                    rooms?.length > 0 && <Pagination
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
                                await setLoading(true)

                            }
                        }}
                        onBack={ async () => {
                            if (filter.page <= pagination?.last_page && filter.page > 1) {
                                const nextPage = filter.page - 1;
                                await setFilter({ ...filter, page: nextPage });
                                await setLoading(true)
                            }
                        }}
                        onPage={ async (page) => {
                            if (page !== pagination?.current_page) {
                                await setFilter({ ...filter, page });
                                await setLoading(true)
                            }
                        }}
                    />
                }
            </div>
            <div className="pt-4 bg-white rounded-2xl mt-4">

                {
                    loading ? <BrandLogoLoading /> :
                        <>
                            {
                                rooms?.length ?  <ListRoom listRooms={rooms} id={Date.now()} /> : (
                                    <div className="pb-6 pt-4 text-center">
                                        No data
                                    </div>
                                )
                            }
                        </>
                }

            </div>
        </div>
    )
}

export default PopuplarRoom;
