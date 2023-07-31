import React, { useEffect } from "react";
import Form from "../../../components/Form/Form";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import "../Index.scss";

const UserRegister = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("localhost:3000/api/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
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
        <Form />
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
