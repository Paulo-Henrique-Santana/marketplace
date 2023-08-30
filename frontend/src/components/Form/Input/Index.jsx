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
  errors,
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
        style={
          errors[validation]
            ? { borderColor: "red" }
            : { borderColor: "rgb(170, 170, 170)" }
        }
      />
    </div>
  );
};

export default Input;
