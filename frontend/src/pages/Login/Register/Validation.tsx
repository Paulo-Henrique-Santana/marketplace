import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import { USERS_GET, USER_POST_REGISTER } from "../../../Api/Index";
import * as Yup from "yup";
import useFetch from "../../../Hooks/useFetch";
import Regex from "./Regex";
import { useAxiosGetCPF, usePostLogin } from "../../../Hooks/useAxiosLogin";

type OnSubmitProps = {
  name: string;
  password: string;
  email: string;
  cpf: string;
  confirmPassword: string;
};

const Validation = () => {
  const [errorInputCpf, setErrorInputCpf] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const { passwordRegex, cpfRegex } = Regex();
  const { setloggedUser } = useContext(LocalStorageContext);
  const { request } = useFetch();
  const navigate = useNavigate();

  const { mutate, error } = usePostLogin();

  const RemoverSpecialCharacters = (string: string) => {
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

  const onBlurCpf1 = async (cpf: React.ChangeEvent<HTMLInputElement>) => {
    if (cpf.target.value && !errors.email) {
      const { url, options } = USERS_GET({
        cpf: RemoverSpecialCharacters(cpf.target.value),
      });
      const { json } = await request(url, true, options);
      // console.log(json);

      if (json.length) setErrorInputCpf("CPF already registered");
      else setErrorInputCpf("");
    }
  };

  // const { data } = useGetRequest(
  //   "user",
  //   "userKey",
  //   RemoverSpecialCharacters(cpf)
  // );
  // console.log(data);
  // console.log(cpf);

  const { data } = useAxiosGetCPF("user", "cpfExists", cpf);

  const cpfs = data?.map((item) => item.cpf);

  console.log(cpfs.length);

  // console.log(data);

  if (cpf && !errors.email) {
    if (cpfs?.length) setErrorInputCpf("CPF already registered");
    else setErrorInputCpf("");
  }

  // const onBlurCpf = async (cpf: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(cpf.target.value);

  //   if (cpf.target.value && !errors.email) {
  //     if (data.length) setErrorInputCpf("CPF already registered");
  //     else setErrorInputCpf("");
  //   }
  // };

  const onBlurEmail = async (email: React.ChangeEvent<HTMLInputElement>) => {
    if (email.target.value && !errors.email) {
      const { url, options } = USERS_GET({ email: email.target.value });
      const { json } = await request(url, true, options);
      if (json.length) {
        setErrorInputEmail("E-mail already registered");
      } else {
        setErrorInputEmail("");
      }
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
    onBlurEmail,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorInputCpf,
    errorInputEmail,
    cpf,
    setCpf,
  };
};

export default Validation;
