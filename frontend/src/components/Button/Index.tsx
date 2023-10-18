import React from "react";
import styles from "./Index.module.scss";

const Button = ({ text }) => {
  return <button className={styles.btn}>{text}</button>;
};

export default Button;
