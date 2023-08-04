import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegister from "./pages/Login/UserRegister/Index";
import ForgotPassword from "./pages/Login/ForgotPassword/Index";
import Header from "../src/components/Header/Index";
import Register from "./pages/Login/Register/Index";

import "./styles/Global.scss";
import Provider from "./context/Provider";

const App = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
