import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { USERS_GET, USER_POST_REGISTER } from "../../../Api/Index";
import useFetch from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const Validation = () => {
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
  const passwordRegex =
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  const removerCaracteresEspeciais = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, "");
  };

  const { request } = useFetch();
  const { setErrorInputCpf, setErrorInputEmail, setLoginName } =
    useContext(AppContext);

  const navigate = useNavigate();
  const schema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    // .min(3, "Name must be at least 3 characters long"),

    email: Yup.string(),
    // .email("Email format is not valid")
    // .required("Required field"),

    cpf: Yup.string(),
    // .required("Required field")
    // .max(11, "Maximum 12 characters")
    // .matches(cpfRegex, "Invalid CPF")
    // .transform((element) => removerCaracteresEspeciais(element)),

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
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onBlurCpf = async (cpf) => {
    if (cpf.target.value && !errors.email) {
      const { url, options } = USERS_GET({
        cpf: removerCaracteresEspeciais(cpf.target.value),
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
    const { response, json } = await request(url, options);

    if (response.ok) {
      setLoginName(data.name);
      alert("Registration done successfully");
      navigate("/");
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
    schema,
  };
};

export default Validation;
