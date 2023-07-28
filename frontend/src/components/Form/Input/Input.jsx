import React from "react";
import styles from "./Index.module.scss";

const Input = ({ htmlFor, type, name, id, text }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={htmlFor} className={styles.label}>{text}</label>
      <input type={type} name={name} id={id} />
    </div>
  );
};

export default Input;
