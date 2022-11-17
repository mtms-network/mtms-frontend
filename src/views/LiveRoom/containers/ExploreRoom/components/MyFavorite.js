import React, {useEffect, useState} from "react";
import {getMyFavorite} from "../../../../../services";
import {BrandLogoLoading, GroupTitle, Pagination} from "../../../../../components";
import ListRoom from "./ListRoom";

const MyFavorite = ({ keyword, roomType }) => {
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        status: 'live',
        roomType: roomType,
        keyword: '',
    })
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({})

    const fetchData = async () => {
        await setLoading(true);
        const res = await getMyFavorite(filter);
        await setRooms(res?.data || []);
        await setPagination(res?.meta);
        await setLoading(false);
    }

    useEffect(() => {
        setFilter({
            ...filter,
            roomType: roomType,
            keyword: keyword,
            page: 1,
        })
        setLoading(true)
    }, [roomType, keyword])


    useEffect(() => {
        if(loading){
            fetchData().then();
        }
    }, [loading])

    return (
        <div className="">
            <div className="flex justify-between">
                <GroupTitle
                    className="sm:pb-0 pb-4 flex justify-center"
                    title={"My favorites"}
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

export default MyFavorite;
