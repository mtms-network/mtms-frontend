import React from "react";
import styles from "./index.module.css";

const Checkbox = ({label, checked, name, ...props}) => {
  return (
      <label className={styles.container}>
        { label }
        <input type="radio" checked={checked} name={name} {...props}/>
        <span className={styles.checkmark} />
      </label>
  );
};

export default Checkbox;
