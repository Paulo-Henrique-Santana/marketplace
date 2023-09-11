import React, { useContext, useState } from "react";
import { USER_POST_LOGIN } from "../../../Api/Index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useFetch from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const Validation = () => {
  const [errorInputLogin, setErrorInputLogin] = useState("");
  const { request } = useFetch();
  const navigate = useNavigate();
  const { setToken, setloggedUser } = useContext(AppContext);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Required field")
      .min(3, "Name must be at least 3 characters long"),

    password: Yup.string().required("Required field"),
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

  const onSubmit = async (data) => {
    if (data) {
      const { url, options } = USER_POST_LOGIN({
        email: data.email,
        password: data.password,
      });
      const { response, json } = await request(url, options);
      if (!response.ok) return setErrorInputLogin(json.message);

      if (response.ok) {
        navigate("/");
        setToken(json.token);
        setloggedUser(json.user);
        setErrorInputLogin("");
      }
    }
    reset();
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    schema,
    errorInputLogin,
  };
};

export default Validation;
