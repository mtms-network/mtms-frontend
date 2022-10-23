import React, {useEffect, useState} from "react";
import RoomItem from "./RoomItem";

const RoomList = ({ id= 'liveRoom' }) => {

    const [grid, setGrid] = useState('');

    const _setGrid = () => {
        let el = document.getElementById(id);

        if(el){
            let grid = '';
            if(el.offsetWidth >= 664){
                grid = 'grid grid-cols-2';
            }

            if(el.offsetWidth >= 966){
                grid = 'grid grid-cols-3';
            }

            if(el.offsetWidth < 664){
                grid = 'grid grid-cols-1';
            }

            setGrid(grid);
        }
    }

    useEffect(() => {
        if(id) {
            _setGrid();

            window.addEventListener('resize', (event) => {
                _setGrid();
            })
        }

    }, [])

    return (
        <div id={id}>
            <div className="flex items-center justify-center mb-2">
                <div className="border-t-2 w-4/12"/>
                <div className="w-4/12 text-center text-xl uppercase">Live Room</div>
                <div className="border-t w-4/12"/>
            </div>
            <div className={`${grid} gap-4`}>
                <RoomItem id={1} />
                <RoomItem id={2} />
                <RoomItem id={3} />
                <RoomItem id={4} />
                <RoomItem id={5} />
            </div>
        </div>
    )
}

export default RoomList;
