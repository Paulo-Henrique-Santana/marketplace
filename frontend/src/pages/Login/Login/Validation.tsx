import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import { useAxiosQueryPost } from "../../../Hooks/useAxiosFavoriteQuery";

const Validation = () => {
  const [errorInputLogin, setErrorInputLogin] = useState<any>("");
  const navigate = useNavigate();
  const { setToken, setloggedUser } = useContext(LocalStorageContext);
  const { mutate } = useAxiosQueryPost();

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

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (email && password) {
      const login = {
        url: "auth",
        data: {
          email,
          password,
        },
      };
      mutate(login, {
        onSuccess: (data) => {
          navigate("/");
          setToken(data.token);
          setloggedUser(data.user);
          setErrorInputLogin("");
        },
        onError: (error) => {
          setErrorInputLogin(error.response.data.message);
        },
      });
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
