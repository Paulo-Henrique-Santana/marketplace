import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Validation = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Campo obrigatório"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "A senhas precisam ser iguais")
      .required("Campo"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;
  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    formState,
    errors,
  };
};

export default Validation;
