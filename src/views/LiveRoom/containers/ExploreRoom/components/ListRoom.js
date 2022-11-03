import React, {useEffect, useState} from "react";
import RoomItem from "./RoomItem";
import {getPublicLiveRoom} from "../../../../../services";

const ListRoom = ({id = 'listLiveRoom', listRooms = []}) => {

    const [gridClass, setGridClass] = useState('grid grid-cols-4');

    const handleResize = () => {
        let elList = document.getElementById(id);
        if(elList){
            let width = elList.offsetWidth
            // 1508
            let cls = '';
            if(width > 1053){
                cls = 'grid grid-cols-4';
            }

            if(width < 1053){
                cls = 'grid grid-cols-3';
            }

            if(width < 784){
                cls = 'grid grid-cols-2';
            }

            if(width < 544){
                cls = 'grid grid-cols-1';
            }
            if(cls){
                setGridClass(cls);
            }
        }
    }

    useEffect(() => {
        let elList = document.getElementById(id);
        handleResize();
        if(elList)
        {
            window.addEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {/* <div className="flex items-center justify-center my-4"> */}
            {/*     <div className="border-t w-4/12"></div> */}
            {/*     <div className="w-4/12 text-center text-xl uppercase">Live Room</div> */}
            {/*     <div className="border-t w-4/12"></div> */}
            {/* </div> */}
            <div id={id} className={`${gridClass} gap-4 px-4 pb-4`}>
                {
                    listRooms?.map((item, index) => {
                        return <RoomItem key={index} item={item} />
                    })
                }
            </div>
        </>
    )
}

export default ListRoom;
