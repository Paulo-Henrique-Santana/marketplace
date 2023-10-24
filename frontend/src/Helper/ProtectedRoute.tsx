import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LocalStorageContext } from "../Context/LocalStorageContext";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { token } = useContext(LocalStorageContext);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
