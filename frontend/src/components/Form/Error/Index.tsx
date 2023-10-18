import React from "react";
import styles from "./Index.module.scss";

const Error = ({ error }) => {
  return <p className={styles.error}>{error}</p>;
};

export default Error;
