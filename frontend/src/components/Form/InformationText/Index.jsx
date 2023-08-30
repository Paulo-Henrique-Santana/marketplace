import React from "react";
import styles from "./Index.module.scss";

const InformationText = ({ text }) => {
  return <span className={styles.informationText}>{text}</span>;
};

export default InformationText;
