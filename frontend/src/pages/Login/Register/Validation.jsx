import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Validation = () => {
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  const removerCaracteresEspeciais = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, "");
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Required field")
      .min(3, "Name must be at least 3 characters long"),

    email: Yup.string()
      .email("Email format is not valid")
      .required("Required field"),

    cpf: Yup.string()
      .required("Required field")
      .matches(cpfRegex, "Invalid CPF")
      .transform((element) => removerCaracteresEspeciais(element)),

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
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    schema,
  };
};

export default Validation;
