import React from "react";

const Status = ({status}) => {

  const active = status ? 'active' : 'inactive';

  const color = {
    active: {
      wrap: '#BBF7D0',
      color: '#22C55E',
      cir: '#22C55E',
      rec: '#6EDD97',
    },
    inactive: {
      wrap: '#FEE2E2',
      color: '#EF4444',
      cir: '#EF4444',
      rec: '#FCA5A5',
    }
  };

  return (
    <div className="rounded-2xl p-1 w-auto flex items-center cursor-pointer max-w-[14rem]" style={{color: color[active].color, backgroundColor: color[active].wrap}}>
      <div className={`flex items-center mx-2 ${ active === 'active' ? "flex-row-reverse" : '' }`}>
        <div className={`rounded-full bg-[${color[active].cir}] w-5 h-5 z-10`} style={{ backgroundColor: color[active].cir }} />
        <div className={`w-8 h-4 bg-[${color[active].rec}] ${ active === "active" ? "-mr-4" : "-ml-4" } rounded-full`} style={{ backgroundColor: color[active].rec }}/>
      </div>
      <div className="pr-2">
        { status ? "Completed" : "Incomplete" }
      </div>
    </div>
  );
};

export default Status;
