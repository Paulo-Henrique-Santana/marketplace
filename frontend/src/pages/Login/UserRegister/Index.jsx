import React, { useEffect } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";
import Validation from "../Register/Validation";
import Error from "../../../components/Form/Error/Error";
import useFetch from "../../../Hooks/useFetch";
import { USER_POST_LOGIN } from "../../../Api/Index";

import "../Index.scss";

const UserRegister = () => {
  const { onSubmit, register, handleSubmit, errors } = Validation();
  const { data, loading, error, request } = useFetch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:3000/api/user", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "Gabriel",
  //         password: "123",
  //         email: "gabrielp_lacerda@hotmail.com",
  //         cpf: 51412984858,
  //       }),
  //     });
  //     const json = await response.json();

  //     console.log(json);
  //   };
  //   fetchData();
  // }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    const { url, options } = USER_POST_LOGIN({
      name: "J222",
      password: "22222",
      email: "ff3_lacerda@hotmail.com",
      cpf: 14323,
    });
    // console.log("dsa");
    // request(url, options);
    const { response } = await request(url, options);
    // console.log(await response.json());
    // if (response.ok) userLogin(username.value, password.value);
  };

  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Access your account" />
        <form onSubmit={handleLogin}>
          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Name"
            register={register}
            validation="name"
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
