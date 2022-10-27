import React from "react";
import TopicType from "./TopicType";
import {InputSingle} from "../../../../../components/base/Input";

const HeaderRoom = () => {
    return (
        <div className="bg-white p-2 rounded-2xl">
            <TopicType />
            <div className="text-3xl font-bold text-center py-2">Explore Rooms on MTMS community</div>
            <div className="flex justify-center py-3">
                <div className="flex-1 flex justify-start items-start pr-10 max-w-[50%]">
                    <InputSingle
                        compactInput
                        placeholder={"Search for rooms..."}
                        leftIcon={<img src="/icons/icons/search-normal-outline.svg" alt="search" />}
                    />
                </div>
            </div>
        </div>
    )
}

export default HeaderRoom;
