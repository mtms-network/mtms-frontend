import React, {useEffect, useState} from "react";
import {MeetingItem} from "./index";

const ListMeetingItem = ({
    uuid,
    loading,
    meetings = [],
    onConfirmDeleteMeeting
}) => {

    const [gridClass, setGridClass] = useState('grid grid-cols-4');
    const handleResize = () => {
        let elList = document.getElementById(uuid);
        if(elList){
            let width = elList.offsetWidth
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

            if(width < 400){
                cls = 'grid grid-cols-1';
            }

            if(width > 1300){
                cls = 'grid grid-cols-5';
            }
            if(cls){
                setGridClass(cls);
            }
        }
    }

    useEffect(() => {
        let elList = document.getElementById(uuid);
        handleResize();
        if(elList)
        {
            window.addEventListener('resize', handleResize)
        }
    }, [])


    return (
        <div>
            <div className={`gap-4 ${gridClass}`}>
                {!loading &&
                    meetings?.map((item) => (
                        <MeetingItem
                            onDelete={() => {
                                onConfirmDeleteMeeting && onConfirmDeleteMeeting(item);
                            }}
                            data={item}
                            key={item?.uuid}
                        />
                    ))}
            </div>
        </div>
    )
}

export default ListMeetingItem;
