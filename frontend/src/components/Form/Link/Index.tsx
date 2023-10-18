import React from "react";
import { Link } from "react-router-dom";
import styles from "./Index.module.scss";

type FormLinkProps = {
  firstText?: string;
  secondText?: string;
  link: string;
};

const FomrLink = ({ firstText, secondText, link }: FormLinkProps) => {
  return (
    <span className={styles.span}>
      <p>
        {firstText} <Link to={link}> {secondText}</Link>
      </p>
    </span>
  );
};

export default FomrLink;
