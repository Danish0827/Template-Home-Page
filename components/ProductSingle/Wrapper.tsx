import React from "react";

const Wrapper = ({ children, className }: any) => {
  return (
    <>
      <div className={`w-full  px-5 md:px-10 mx-auto ${className || ""}`}>
        {children}
      </div>
    </>
  );
};

export default Wrapper;
