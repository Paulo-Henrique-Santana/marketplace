import React from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import LinkForm from "../../../components/Form/Link/LinkForm";
import ValidationForm from "../Validation/ValidationForm";

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
          {errors.name && <p>{errors.name.message}</p>}
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
          {errors.email && <p>{errors.email.message}</p>}
          <Input
            htmlFor="cpf"
            type="number"
            name="cpf"
            id="cpf"
            text="CPF"
            placeholder="123.456.789-10"
            register={register}
            validation="cpf"
          />
          {errors.cpf && <p>{errors.cpf.message}</p>}
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
            register={register}
            validation="password"
            pattern={/^\d+$/}
            message="dsad"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Confirm password"
            register={register}
            validation="confirmPassword"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
