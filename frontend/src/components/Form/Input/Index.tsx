import React, {
  FocusEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./Index.module.scss";

type InputProps = React.ComponentProps<"input"> & {
  htmlFor: string;
  text: string;
  register: (item: any) => any;
  validation: any;
  errors?: any;
  onBlur?: any;
};

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
}: InputProps) => {
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
