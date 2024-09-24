import React from "react";

const AnnouncementBar = () => {
  return (
    <div className="bg-templatePrimary from-templatePrimary to-templateSecondary">
      <div className="templateContainer h-[30px] flex items-center justify-center">
        <h2 className="text-center w-full text-[12px] tracking-wide leading-none text-white">
          20% off everything! Shop Now
        </h2>
      </div>
    </div>
  );
};

export default AnnouncementBar;
