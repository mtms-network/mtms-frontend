import React from "react";

export default function IconBase({
  icon,
  iconActivated,
  isActive = false,
  alt = "icon",
  className = "",
}) {
  return <img className={className} src={isActive ? iconActivated || icon : icon} alt={alt} />;
}
