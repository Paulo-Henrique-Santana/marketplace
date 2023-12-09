import React, { useContext, useEffect } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/Index";
import LinkForm from "../../../components/Form/Link/Index";
import Input from "../../../components/Form/Input/Index";
import Button from "../../../components/Button/Index";
import Validation from "./Validation";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import Error from "../../../components/Form/Error/Index";
import { Navigate } from "react-router-dom";

import "../Index.scss";

const Login = () => {
  const { onSubmit, register, handleSubmit, errorInputLogin, errors } =
    Validation();
  const { token } = useContext(LocalStorageContext);

  if (token) return <Navigate to="/" />;

  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Access your account" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="email"
            type="email"
            name="email"
            id="email"
            text="E-mail"
            register={register}
            validation="email"
            errors={errors}
          />
          {errors.email && <Error error={errors.email.message} />}

          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
            register={register}
            validation="password"
            errors={errors}
          />
          {errors.password && <Error error={errors.password.message} />}

          <Error error={errorInputLogin} />
          <Button text="Enter" />
        </form>

        <LinkForm link="forgot-password" secondText="Forgot password" />
        <LinkForm
          link="register"
          firstText="Don't have an account?"
          secondText=" Register"
        />
      </div>
    </section>
  );
};

export default Login;
