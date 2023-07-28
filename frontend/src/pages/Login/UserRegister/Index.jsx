import React from "react";
import Form from "../../../components/Form/Form";
import Logo from "../../../components/Logo/Logo";
import InformationText from "../../../components/Form/InformationText/InformationText";
import LinkForm from "../../../components/Form/Link/LinkForm";
import "./Index.scss";

const index = () => {
  return (
    <section className="singInContainer">
      <div className="singIn">
        <Logo />
        <InformationText />
        <Form />
        <LinkForm link="/forgot-password" secondText="Forgot password" />
        <LinkForm firstText="Don't have an account?" secondText=" Register" />
      </div>
    </section>
  );
};

export default index;
