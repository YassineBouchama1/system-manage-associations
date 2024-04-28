import React from "react";

const MapInfo = () => {
  return (
    <div className="  text-left text-sm bg-white bg-opacity-80 shadow-md rounded p-2">
      <div className="flex items-center mb-1  rtl:justify-start rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-yellow-300"></div>
        <span>0</span>
      </div>
      <div className="flex items-center mb-1  rtl:justify-start  rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-yellow-500"></div>
        <span>1–20</span>
      </div>
      <div className="flex items-center mb-1  rtl:justify-start rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-orange-400"></div>
        <span>20–50</span>
      </div>
      <div className="flex items-center mb-1  rtl:justify-start rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-orange-600"></div>
        <span>50–100</span>
      </div>
      <div className="flex items-center mb-1  rtl:justify-start rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-red-600"></div>
        <span>100–200</span>
      </div>
      <div className="flex items-center mb-1  rtl:justify-start rtl:gap-x-1">
        <div className="w-4 h-4 mr-2 bg-red-800"></div>
        <span>+200</span>
      </div>
    </div>
  );
};

export default MapInfo;
