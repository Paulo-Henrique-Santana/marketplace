import React from "react";
import Form from "../../../components/Form/Form";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import "../Index.scss";

const ForgotPassword = () => {
  return (
    <section className="formContainer">
      <div className="form">
        <Logo />
        <InformationText text="Forgot your password?" />
        <p className="forgotYourPassword">
          Don't worry! Enter your registration email and we will send you
          instructions
        </p>
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

export default ForgotPassword;
