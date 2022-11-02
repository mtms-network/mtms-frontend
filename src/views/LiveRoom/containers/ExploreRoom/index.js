import React, {useCallback, useMemo, useState} from "react";
import {MainLayout} from "../../../../components";
import HeaderRoom from "./components/HeaderRoom";
import BodyRoom from "./components/BodyRoom";
import PopuplarRoom from "./components/PopularRoom";

const ExploreRoom = () => {

    const [roomType, setRoomType] = useState('')

    const handleSetRoomType = useCallback((type) => {
        setRoomType(type);
    }, [])


    return (
        <MainLayout>
            <HeaderRoom roomType={roomType} handleSetRoomType={handleSetRoomType} />
            <BodyRoom />
            <PopuplarRoom roomType={roomType} />
        </MainLayout>
    )
}

export default ExploreRoom;
