import classNames from "classnames";
import React from "react";

export function WalletBlockButton({ name, src, onClick, className = "", nameClass = "" }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        type="button"
        onClick={onClick}
        className={classNames(
          "btn bg-white flex items-center justify-center",
          `border-1 hover:shadow-xl border-wallet-button rounded-2xl h-32 w-32`,
          "hover:border-primary hover:bg-white",
          "shadow-lg flex flex-col space-y-4",
          "cursor-pointer",
          className,
        )}
      >
        <img src={src} alt={name || "wallet-logo"} className="h-12" />
        {name && <span className={classNames("text-gray text-xs", nameClass)}>{name}</span>}
      </button>
    </div>
  );
}
