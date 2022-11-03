import React, {useCallback, useMemo, useState} from "react";
import {MainLayout} from "../../../../components";
import HeaderRoom from "./components/HeaderRoom";
import BodyRoom from "./components/BodyRoom";
import PopuplarRoom from "./components/PopularRoom";
import { Tabs } from 'antd';
import LiveRoomToDay from "../ListLiveRoom/LiveRoomToDay";

const ExploreRoom = () => {

    const [roomType, setRoomType] = useState('')
    const [keyword, setKeyword] = useState('');
    const handleSetRoomType = useCallback((type) => {
        setRoomType(type);
    }, [])

    const handleSetKeyword = useCallback((key) => {
        setKeyword(key)
    }, [])
    console.log('keyword', keyword);
    return (
        <MainLayout>
            <HeaderRoom
                roomType={roomType}
                handleSetRoomType={handleSetRoomType}
                keyword={keyword}
                handleSetKeyword={handleSetKeyword}
            />

            <div className="mt-4">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Live rooms" key="1">
                        <BodyRoom
                            roomType={roomType}
                            keyword={keyword}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Popular rooms" key="2">
                        <PopuplarRoom
                            roomType={roomType}
                            keyword={keyword}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="My rooms" key="3">
                        <LiveRoomToDay />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            {/* <BodyRoom /> */}
            {/* <PopuplarRoom roomType={roomType} /> */}
        </MainLayout>
    )
}

export default ExploreRoom;
