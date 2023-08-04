import React, { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
import styles from "./Index.module.scss";
import AppContext from "../../../context/AppContext";
import ReactInputMask from "react-input-mask";

const Input = ({
  htmlFor,
  type,
  name,
  id,
  text,
  placeholder,
  register,
  validation,
}) => {
  const { setText } = useContext(AppContext);
  // const { register, handleSubmit } = useForm();
  // console.log(register);
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
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
};

export default Input;
