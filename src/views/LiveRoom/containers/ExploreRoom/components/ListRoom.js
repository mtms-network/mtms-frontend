import React, {useEffect, useState} from "react";
import RoomItem from "./RoomItem";

const ListRoom = ({id = 'listLiveRoom'}) => {

    const [gridClass, setGridClass] = useState('grid grid-cols-4');

    const handleResize = () => {
        let elList = document.getElementById(id);
        if(elList){
            let width = elList.offsetWidth
            // 1508
            let cls = '';
            if(width < 1508){
                cls = 'grid grid-cols-3';
            }

            if(width < 1230){
                cls = 'grid grid-cols-2';
            }

            if(width < 1023){
                cls = 'grid grid-cols-3';
            }

            if(width < 910){
                cls = 'grid grid-cols-2';
            }

            if(width < 632){
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
            <div className="flex items-center justify-center my-4">
                <div className="border-t w-4/12"></div>
                <div className="w-4/12 text-center text-xl uppercase">Live Room</div>
                <div className="border-t w-4/12"></div>
            </div>
            <div id={id} className={`${gridClass} gap-4 px-4 pb-4`}>
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
            </div>
        </>
    )
}

export default ListRoom;
