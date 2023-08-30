import React from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/Index";
import LinkForm from "../../../components/Form/Link/Index";
import Input from "../../../components/Form/Input/Index";
import Button from "../../../components/Button/Index";
import Error from "../../../components/Form/Error/Index";
import Validation from "../ForgotPassword/Validation";

import "../Index.scss";

const ForgotPassword = () => {
  const { onSubmit, register, handleSubmit, errors } = Validation();

  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Forgot your password?" />
        <p className="forgotYourPassword">
          Don't worry! Enter your registration email and we will send you
          instructions.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="email"
            type="email"
            name="email"
            id="email"
            text="E-mail"
            register={register}
            validation="email"
            errors
          />
          {errors.email && <Error error={errors.email.message} />}
          <Button text="Receive instructions" />
        </form>
        <LinkForm
          link="/login"
          firstText="Back to"
          secondText=" Login"
        />
      </div>
    </section>
  );
};

export default ForgotPassword;
