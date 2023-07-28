import React from "react";
import { Link } from "react-router-dom";
import styles from "./Index.module.scss";

const FomrLink = ({ firstText, secondText, link }) => {
  return (
    <span className={styles.span}>
      <p>
        {firstText}
        <Link to={link}>{secondText}</Link>
      </p>
    </span>
  );
};

export default FomrLink;
