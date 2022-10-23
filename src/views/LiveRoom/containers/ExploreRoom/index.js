import React from "react";
import {MainLayout} from "../../../../components";
import TypeRoom from "./components/TypeRoom";
import IconBgMtms from "../../../../components/Icons/IconBgMtms";
import RoomList from "./components/RoomList";

const ExploreRoom = () => {
    return (
        <MainLayout>
            <TypeRoom />
            <div className="w-full my-4">
                <IconBgMtms />
            </div>

            <RoomList />
        </MainLayout>
    )
}

export default ExploreRoom;
