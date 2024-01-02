import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import { USERS_GET, USER_POST_REGISTER } from "../../../Api/Index";
import * as Yup from "yup";
import useFetch from "../../../Hooks/useFetch";
import Regex from "./Regex";
import { useAxiosGetCPF, usePostLogin } from "../../../Hooks/useAxiosLogin";
import { CpfProps } from "../../../Types/Login";
import {
  useAxiosQueryGet,
  useAxiosQueryGet2,
  useCheckExistence,
} from "../../../Hooks/useAxiosQuery";
import { axiosInstance } from "../../../Api";
import { useAxiosGet } from "../../../Hooks/useAxiosGet";
import { useQueries, useQuery } from "react-query";

type OnSubmitProps = {
  name: string;
  password: string;
  email: string;
  cpf: string;
  confirmPassword: string;
};

const Validation = () => {
  const RemoverSpecialCharacters = (string: string) => {
    return string.replace(/[^a-zA-Z0-9]/g, "");
  };

  const [errorInputCpf, setErrorInputCpf] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [email, setEmail] = useState("");
  const { passwordRegex, cpfRegex } = Regex();
  const { setloggedUser } = useContext(LocalStorageContext);
  const { request } = useFetch();
  const navigate = useNavigate();

  const cpfRemove = RemoverSpecialCharacters(cpf);

  // const { data } = useAxiosQueryGet<CpfProps[]>("user?cpf=", "cpfExists", cpfRemove);
  const [existValue, setExistValue] = useState("");

  const { data } = useAxiosQueryGet2("user?", existValue);

  const { mutate, error } = usePostLogin();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Required field")
      .min(3, "Name must be at least 3 characters long"),

    email: Yup.string()
      .email("Email format is not valid")
      .required("Required field")
      .test("checkEmailAvailability", "Email already exists", (value) => {
        setExistValue(`email=${value}`);
        // return !isError && !(queryData && queryData.length > 0);
      }),

    cpf: Yup.string()
      .required("Required field")
      .max(11, "Maximum 12 characters")
      .matches(cpfRegex, "Invalid CPF")
      .transform((element) => RemoverSpecialCharacters(element))
      .test("checkCpfAvailability", "CPF already exists", (value) => {
        setExistValue(`cpf=${value}`);
        // return !(data && data.length > 0);
      }),

    password: Yup.string().required("Required field"),
    // .matches(
    //   passwordRegex,
    //   "Required 8 characters,1 capital letter, 1 number,1 special character"
    // ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords need to be the same")
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

  // console.log(errors);

  // const onBlurCpf = async (cpf: React.ChangeEvent<HTMLInputElement>) => {
  // const cpfArray = data!.map((item: CpfProps) => item.cpf);
  // const cpfValue = RemoverSpecialCharacters(cpf.target.value);

  // if (cpfValue && !errors.email) {
  //   if (cpfArray.includes(cpfValue))
  //     setErrorInputCpf("CPF already registered");
  //   else setErrorInputCpf("");
  // }
  // };

  // const onBlurEmail = async (email: React.ChangeEvent<HTMLInputElement>) => {
  //   if (email.target.value && !errors.email) {
  //     const { url, options } = USERS_GET({ email: email.target.value });
  //     const { json } = await request(url, true, options);
  //     if (json.length) {
  //       setErrorInputEmail("E-mail already registered");
  //     } else {
  //       setErrorInputEmail("");
  //     }
  //   }
  // };

  const onBlurEmail1 = async (email: React.ChangeEvent<HTMLInputElement>) => {
    const emailArray = data!.map((item: CpfProps) => item.email);
    const emailValue = RemoverSpecialCharacters(email.target.value);

    if (emailValue && !errors.email) {
      if (emailArray.includes(emailValue))
        setErrorInputCpf("CPF already registered");
      else setErrorInputCpf("");
    }
  };

  const onSubmit = (data: OnSubmitProps) => {
    mutate({
      url: "user",
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
        cpf: data.cpf,
      },
    });

    if (!error) {
      setloggedUser(data.name);
      alert("Registration done successfully");
      navigate("/login");
    }
    setCpf("");
    reset();
  };

  return {
    onSubmit,
    // onBlurCpf,
    // onBlurEmail,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorInputCpf,
    errorInputEmail,
    cpf,
    setCpf,
    email,
    setEmail,
  };
};

export default Validation;
