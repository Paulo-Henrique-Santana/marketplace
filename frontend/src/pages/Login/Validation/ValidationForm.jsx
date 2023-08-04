import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AppContext from "../../../context/AppContext";

// .transform((name) => {
//   return name
//     .trim()
//     .split(" ")
//     .map((word) => {
//       return word[0].toLocaleUpperCase().concat(word.substring(1));
//     })
//     .join(" ");
// }),

const Validation = () => {
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Required field")
      .min(3, "Name must be at least 3 characters long"),

    email: Yup.string()
      .email("Email format is not valid")
      .required("Required field"),

    cpf: Yup.string()
      .required("Required field")
      .matches(cpfRegex, "Invalid CPF"),

    password: Yup.string()
      .required("Required field")
      .matches(
        passwordRegex,
        "Required 8 characters,1 capital letter, 1 number,1 special character"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords need to be the same")
      .required("Required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};

export default Validation;
