import React, { useContext, useState } from "react";
import styles from "./Index.module.scss";

const Input = ({
  htmlFor,
  type,
  name,
  id,
  text,
  placeholder,
  register,
  validation,
  onBlur,
}) => {

  return (
    <div className={styles.wrapper}>
      <label htmlFor={htmlFor} className={styles.label}>
        {text}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        {...register(validation)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
