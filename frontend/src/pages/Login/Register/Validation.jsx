import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { USERS_GET, USER_POST_REGISTER } from "../../../Api/Index";
import useFetch from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import Regex from "./Regex";

const Validation = () => {
  const [errorInputCpf, setErrorInputCpf] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");
  const { passwordRegex, cpfRegex } = Regex();
  const { setloggedUser } = useContext(AppContext);
  const { request } = useFetch();
  const navigate = useNavigate();

  const RemoverSpecialCharacters = (string) => {
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
      .max(11, "Maximum 12 characters")
      .matches(cpfRegex, "Invalid CPF")
      .transform((element) => RemoverSpecialCharacters(element)),

    password: Yup.string().required("Required field"),
    // .matches(
    //   passwordRegex,
    //   "Required 8 characters,1 capital letter, 1 number,1 special character"
    // ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords need to be the same")
      .required("Required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onBlurCpf = async (cpf) => {
    if (cpf.target.value && !errors.email) {
      const { url, options } = USERS_GET({
        cpf: RemoverSpecialCharacters(cpf.target.value),
      });
      const { json } = await request(url, options);
      if (json.length) setErrorInputCpf("CPF already registered");
      else setErrorInputCpf("");
    }
  };

  const onBlurEmail = async (email) => {
    if (email.target.value && !errors.email) {
      const { url, options } = USERS_GET({ email: email.target.value });
      const { json } = await request(url, options);
      if (json.length) {
        setErrorInputEmail("E-mail already registered");
      } else {
        setErrorInputEmail("");
      }
    }
  };

  const onSubmit = async (data) => {
    const { url, options } = USER_POST_REGISTER({
      name: data.name,
      password: data.password,
      email: data.email,
      cpf: data.cpf,
    });
    const { response } = await request(url, options);

    if (response.ok) {
      setloggedUser(data.name);
      alert("Registration done successfully");
      navigate("/login");
    }

    reset();
  };

  return {
    onSubmit,
    onBlurCpf,
    onBlurEmail,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorInputCpf,
    errorInputEmail,
  };
};

export default Validation;
