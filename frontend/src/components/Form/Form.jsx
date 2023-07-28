import React from "react";
import Logo from "../../components/Logo/Logo";
import Input from "./Input/Input";
import Button from "../../components/Button/Button";
import LinkForm from "./Link/LinkForm";
import "./Index.scss";

const Form = () => {
  return (
      <form>
        <Input htmlFor="name" type="text" name="name" id="name" text="Name" />
        <Input
          htmlFor="password"
          type="password"
          name="password"
          id="password"
          text="Password"
        />
        <Button text="Enter" />  
      </form>
  );
};

export default Form;
