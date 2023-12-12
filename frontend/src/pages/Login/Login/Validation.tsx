import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import { usePostRequest } from "../../../Hooks/useAxiosFavoriteQuery";

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

type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    cpf: string;
    email: string;
  };
};

const Validation = () => {
  const [errorInputLogin, setErrorInputLogin] = useState("");
  const navigate = useNavigate();
  const { setToken, setloggedUser } = useContext(LocalStorageContext);

  const { mutate } = usePostRequest();

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
        onSuccess: (data: LoginResponse) => {
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
