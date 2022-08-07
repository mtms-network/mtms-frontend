import React from "react";
import Icon from "./Icon";

export default function IconButton({ src, alt = "icon-button", className = "", onClick }) {
  return (
    <button className="btn btn-circle bg-transparent border-0 hover:bg-slate-200" onClick={onClick}>
      <Icon className="h-6 w-6" src={src} alt={alt} />
    </button>
  );
}
