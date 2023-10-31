import React, { useContext } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/Index";
import Input from "../../../components/Form/Input/Index";
import Button from "../../../components/Button/Index";
import LinkForm from "../../../components/Form/Link/Index";
import Validation from "./Validation";
import Error from "../../../components/Form/Error/Index";
import InputMask from "react-input-mask";

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
    cpf,
    setCpf,
  } = Validation();

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
            placeholder="Example: Gabriel Paulo "
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

          <label htmlFor="cpf">CPF</label>
          <InputMask
            htmlFor="cpf"
            type="text"
            id="cpf"
            text="CPF"
            mask="999.999.999-99"
            placeholder="123.456.789-10"
            {...register("cpf", {
              onChange: ({ target }) => setCpf(target.value),
            })}
            value={cpf}
            onBlur={onBlurCpf}
            className="inputMask"
            style={
              errors.cpf
                ? { borderColor: "red" }
                : { borderColor: "rgb(170, 170, 170)" }
            }
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
          link="/login"
          firstText="Already have an account?"
          secondText=" Enter"
        />
      </div>
    </section>
  );
};

export default Register;
