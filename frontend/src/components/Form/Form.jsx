import React from "react";
import Input from "./Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Index.module.scss";

const Form = () => {
  return (
    <form className={styles.form}>
      <Input htmlFor="name" type="text" name="name" id="name" text="Name" />
      <Input
        htmlFor="password"
        type="password"
        name="password"
        id="password"
        text="Password"
      />
      <Button text="Enter" />
    </form>
  );
};

export default Form;
