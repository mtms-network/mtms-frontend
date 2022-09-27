import React, {useEffect, useState} from "react";
import styles from "./index.module.scss";

const OpenBox = ({nft = "", voucher = "", subscription = "", setIsReload = null}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { wrapper } = styles;

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 4300);
  }, []);

  useEffect(() => {
    if(isOpen){
      setTimeout(() => {
        setIsReload(true);
      }, 3500);
    }
  }, [isOpen]);

  return (
    <div
      className={`${wrapper} bg-white flex`}
    >
      { isOpen ? (
        <div className="m-auto animate-bounce">
          <img src={ nft } alt="nft" className="w-48"/>
          <div className="m-auto text-center">
            <div>Plan: <span className="text-orange-base">{ subscription }</span></div>
            <div>Voucher: <span className="text-orange-base">{ voucher }</span></div>
          </div>
        </div>
      ) : <img src="images/unbox.gif" alt="ad" className="w-96 m-auto"/> }
    </div>
  )
}

export default OpenBox;
