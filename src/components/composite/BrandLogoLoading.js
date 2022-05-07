import React from "react";

const BrandLogoLoading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="rounded flex justify-center items-center flex-col p-8">
        <img src="/images/mtms-logo.png" alt="logo" />
        <div className="pt-4">
          <progress className="progress progress-primary w-56" />
        </div>
      </div>
    </div>
  );
};

export default BrandLogoLoading;
