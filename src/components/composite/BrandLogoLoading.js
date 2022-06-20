import React from "react";

const BrandLogoLoading = () => {
  return (
    <div className="flex justify-center items-center h-full animate-pulse">
      <div className="flex justify-center items-center flex-col p-8 rounded-lg opacity-40">
        <img src="/images/mtms-logo-bw.png" alt="logo" className="w-24" />
        <div className="pt-1">
          <progress className="progress progress-primary w-24 h-1" />
        </div>
      </div>
    </div>
  );
};

export default BrandLogoLoading;
