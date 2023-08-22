import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const Validation = () => {
  const { request } = useFetch();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    productName: Yup.string().required("Required field"),
    price: Yup.string().required("Required field"),
    quantity: Yup.string().required("Required field"),
    category: Yup.string().required("Required field"),
    description: Yup.string().required("Required field"),
    // inputFile: Yup.string().required("Required field"),
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
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   reset();
  // };
  return {
    // onSubmit,
    register,
    handleSubmit,
    reset,
    errors,
    schema,

    // errorInputLogin,
  };
};

export default Validation;
