import React, { useContext } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import LinkForm from "../../../components/Form/Link/LinkForm";
import ValidationForm from "../Validation/ValidationForm";
import AppContext from "../../../context/AppContext";
import Error from "../../../components/Form/Error/Error";

const Register = () => {
  const { onSubmit, register, handleSubmit, errors } = ValidationForm();

  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Create your account. It's free!" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Name"
            placeholder="Example: Gabriel Silva"
            register={register}
            validation="name"
          />
          {errors.name && <Error error={errors.name.message} />}
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
          {errors.email && <Error error={errors.email.message} />}
          <Input
            htmlFor="cpf"
            type="text"
            name="cpf"
            id="cpf"
            text="CPF"
            placeholder="123.456.789-10"
            register={register}
            validation="cpf"
            mask="999.999.999-99"
          />
          {errors.cpf && <Error error={errors.cpf.message} />}
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
            register={register}
            validation="password"
          />
          {errors.password && <Error error={errors.password.message} />}
          <Input
            htmlFor="confirmPassword"
            type="password"
            name="password"
            id="confirmPassword"
            text="Confirm password"
            register={register}
            validation="confirmPassword"
          />
          {errors.confirmPassword && (
            <Error error={errors.confirmPassword.message} />
          )}
          <Button text="Register" />
        </form>
        <LinkForm
          link="/"
          firstText="Already have an account?"
          secondText=" Enter"
        />
      </div>
    </section>
  );
};

export default Register;
