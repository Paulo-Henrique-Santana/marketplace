import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegister from "./pages/Login/UserRegister/Index";
import ForgotPassword from "./pages/Login/ForgotPassword/Index";
import Header from "../src/components/Header/Index";
import Register from "./pages/Login/Register/Index";

import "./styles/Global.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
