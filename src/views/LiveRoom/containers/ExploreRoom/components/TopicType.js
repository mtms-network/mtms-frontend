import React from "react";

const TopicType = ({ liveTypes, activeType = '', handleSetRoomType }) => {
    return (
        <div className="px-2 lg:px-24 w-full lg:w-2/3 text-center m-auto">
            {
                liveTypes?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`px-3 py-2 ${ activeType === item?.uuid ? 'bg-primary text-white' : 'border-1' } inline-flex m-1 rounded-3xl cursor-pointer font-bold`}
                            onClick={() => { handleSetRoomType(item.uuid) }}
                        >
                            { item.name }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TopicType;
