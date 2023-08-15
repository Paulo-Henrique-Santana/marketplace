import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword/Index";
import Register from "./Register/Index";
import Login from "./Login/Index";

const RouterLogin = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default RouterLogin;
