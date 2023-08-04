import React, { useContext, useState } from "react";
import styles from "./Index.module.scss";
import AppContext from "../../../context/AppContext";

const Input = ({
  htmlFor,
  type,
  name,
  id,
  text,
  placeholder,
  register,
  validation,
  errors,
}) => {
  const { textInput, setTextInput } = useContext(AppContext);

  // const handleChange = (event) => {
  //   setTextInput(event.target.value);
  // };

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
        // onChange={handleChange}
      />
    </div>
  );
};

export default Input;
