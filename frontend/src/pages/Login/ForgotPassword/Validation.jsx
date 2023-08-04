import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Validation = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email format is not valid")
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
