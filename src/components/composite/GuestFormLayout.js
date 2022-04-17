import React from "react";

export default function GuestFormLayout({ children }) {
  return (
    <div className="flex items-center justify-center px-4 py-6 md:px-0 h-auto bg-dark-base sm:h-screen">
      <div className="w-full sm:w-[70%] lg:w-[40%]">
        <div className="flex flex-col items-center form-base w-full py-8 px-6 sm:p-6">
          <div>
            <img src="/images/mtms-logo.png" alt="logo" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
