import React from "react";
// import { useForm } from "react-hook-form";
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
  pattern,
  message,
}) => {
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
      />
    </div>
  );
};

export default Input;
