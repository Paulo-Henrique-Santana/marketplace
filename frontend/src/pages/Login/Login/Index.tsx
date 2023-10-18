import React, { useContext, useEffect } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/Index";
import LinkForm from "../../../components/Form/Link/Index";
import Input from "../../../components/Form/Input/Index";
import Button from "../../../components/Button/Index";
import Validation from "./Validation";
import { LocalStorageProvider } from "../../../Context/LocalStorageContext";
import Error from "../../../components/Form/Error/Index";
import { Navigate } from "react-router-dom";

import "../Index.scss";

const Login = () => {
  const { onSubmit, register, handleSubmit, errorInputLogin } = Validation();
  const { token } = useContext(LocalStorageProvider);

  if (token) return <Navigate to="/home" />;

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
            placeholder="market@gmail.com"
            register={register}
            validation="email"
            errors
          />
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
            register={register}
            validation="password"
            errors
          />
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
