import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Validation = () => {
  const schema = Yup.object().shape({
    productName: Yup.string().required("Required field"),
    price: Yup.string().required("Required field"),
    quantity: Yup.string().required("Required field"),
    description: Yup.string().required("Required field"),
    category: Yup.string().required("Required field"),
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

  return {
    register,
    handleSubmit,
    reset,
    errors,
    schema,
  };
};

export default Validation;
