import React from "react";

const BrandLogoLoading = () => {
  return (
    <div className="w-screen h-full">
        <img src="/images/mtms-logo.png" alt="logo" />
        <div className="pt-4">
          <progress className="progress w-56" />
        </div>
      </div>
  );
};

export default BrandLogoLoading;
