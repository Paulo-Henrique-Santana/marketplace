import React, { useEffect } from "react";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import Input from "../../../components/Form/Input/Input";
import Button from "../../../components/Button/Button";

import "../Index.scss";

const UserRegister = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Gabriel",
          password: "123",
          email: "gabrielp_lacerda@hotmail.com",
          cpf: 51412984858,
        }),
      });
      const json = await response.json();

      console.log(json);
    };
    fetchData();
  }, []);

  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Access your account" />
        <form>
          {/* <Input htmlFor="name" type="text" name="name" id="name" text="Name" />
          <Input
            htmlFor="password"
            type="password"
            name="password"
            id="password"
            text="Password"
          /> */}
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
