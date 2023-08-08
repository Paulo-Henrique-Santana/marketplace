import React, { useContext, useEffect } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import Validation from "./Validation";
import AppContext from "../../../context/AppContext";
import Error from "../../../components/Form/Error/Error";

import "../Index.scss";

const UserRegister = () => {
  const { onSubmit, register, handleSubmit } = Validation();
  const { errorInputLogin } = useContext(AppContext);
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
          />
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
            register={register}
            validation="password"
          />
          <Error error={errorInputLogin} />
          <Button text="Enter" />
        </form>
        <LinkForm link="/forgot-password" secondText="Forgot password" />
        <LinkForm
          link="/register"
          firstText="Don't have an account?"
          secondText=" Register"
        />
      </div>
    </section>
  );
};

export default UserRegister;
