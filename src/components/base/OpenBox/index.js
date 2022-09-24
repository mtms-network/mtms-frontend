import React, {useEffect, useState} from "react";
import styles from "./index.module.scss";

const OpenBox = ({nft = "", voucher = "", subscription = "", setIsReload = null}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { wrapper, open } = styles;
  useEffect(() => {

  }, [])
  return (
    <div
      className={`${wrapper}`}
    >
      <div className={`${styles.present} ${isOpen ? open : ""}`}>
        {
          isOpen ? (
            <div className={styles.name}>
              <div>
                <b>NFT:</b> { nft } <br/>
              </div>
              <div>
                <b>Voucher:</b> { voucher } <br/>
              </div>
              <div>
                <b style={{width: 90}}>Subscription:</b> { subscription }
              </div>
            </div>
          ) : null
        }

        <div
          className={styles.rotateContainer}
          onClick={() => {
            if(isOpen && setIsReload){
              setIsReload(true);
            }else{
              setIsOpen(true);
            }
          }}
        >
          <div className={styles.bottom} />
          <div className={styles.front} />
          <div className={styles.left} />
          <div className={styles.back} />
          <div className={styles.right} />

          <div className={styles.lid}>
            <div className={styles.lidTop} />
            <div className={styles.lidFront} />
            <div className={styles.lidLeft} />
            <div className={styles.lidBack} />
            <div className={styles.lidRight} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenBox;
