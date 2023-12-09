import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import {
  useAxiosQueryPost,
  postData,
} from "../../../Hooks/useAxiosFavoriteQuery";

import * as Yup from "yup";

type ErrorProps = {
  response: {
    data: {
      message: string;
    };
  };
};

type LoginData = {
  email: string;
  password: string;
};

type postLoginProps = {
  url: "string";
  data: LoginData;
};

const Validation = () => {
  const [errorInputLogin, setErrorInputLogin] = useState("");
  const navigate = useNavigate();
  const { setToken, setloggedUser } = useContext(LocalStorageContext);
  const { mutate, mutateAsync, data } = useAxiosQueryPost();

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

  console.log(data);

  const onSubmit = ({ email, password }: LoginData) => {
    if (email && password) {
      const login = {
        url: "auth",
        data: {
          email,
          password,
        },
      };

      mutate(login, {
        onSuccess: (data: any) => {
          navigate("/");
          setToken(data.token);
          setloggedUser(data.user);
          setErrorInputLogin("");
        },
        onError: (error: unknown) => {
          if (error instanceof Error && "response" in error) {
            const errorResponse = error as ErrorProps;
            setErrorInputLogin(errorResponse.response.data.message);
          }
        },
      });

      reset();
    }
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
