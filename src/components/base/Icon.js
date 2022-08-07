import React from "react";

export default function Icon({ src, alt = "icon", className = "" }) {
  return <img className={className} src={src} alt={alt} />;
}
