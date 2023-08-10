import React, { useContext } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import LinkForm from "../../../components/Form/Link/LinkForm";
import Validation from "./Validation";
import AppContext from "../../../context/AppContext";
import Error from "../../../components/Form/Error/Error";

const Register = () => {
  const {
    onSubmit,
    onBlurCpf,
    onBlurEmail,
    register,
    handleSubmit,
    errors,
    errorInputCpf,
    errorInputEmail,
  } = Validation();
  // const {} = useContext(AppContext);

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
            errors={errors}
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
            onBlur={onBlurEmail}
            errors={errors}
          />
          {errors.email && <Error error={errors.email.message} />}
          <Error error={errorInputEmail} />

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
            onBlur={onBlurCpf}
            errors={errors}
          />
          {errors.cpf && <Error error={errors.cpf.message} />}
          <Error error={errorInputCpf} />

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
          <Input
            htmlFor="confirmPassword"
            type="password"
            name="password"
            id="confirmPassword"
            text="Confirm password"
            register={register}
            validation="confirmPassword"
            errors={errors}
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
