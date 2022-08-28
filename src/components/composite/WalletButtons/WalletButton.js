import classNames from "classnames";
import React from "react";

export function WalletButton({ name, src, onClick, className = "", nameClass = "" }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={onClick}
        className={classNames(
          "btn bg-white flex items-center justify-center",
          "border-1 border-wallet-button rounded-2xl h-14 w-14",
          "hover:border-primary hover:shadow-xl hover:bg-white",
          "cursor-pointer",
          className,
        )}
      >
        <img src={src} alt={name || "wallet-logo"} className="h-6" />
      </button>
      {name && <span className={classNames("text-gray text-xs", nameClass)}>{name}</span>}
    </div>
  );
}
