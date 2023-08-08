import React, { useContext } from "react";
// import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { token, loginName, setToken, setLoginName } = useContext(AppContext);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
