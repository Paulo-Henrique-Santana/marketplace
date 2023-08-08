import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegister from "./pages/Login/UserRegister/Index";
import ForgotPassword from "./pages/Login/ForgotPassword/Index";
import Header from "../src/components/Header/Index";
import Register from "./pages/Login/Register/Index";
import Home from "./pages/Home/Home";
import "./styles/Global.scss";
import Provider from "./context/Provider";
import ProtectedRoute from "./Helper/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="forgot-password/" element={<ForgotPassword />} />
          <Route path="register/" element={<Register />} />
          <Route
            path="home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
