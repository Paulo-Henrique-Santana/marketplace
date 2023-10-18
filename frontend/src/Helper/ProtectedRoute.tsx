import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LocalStorageProvider } from "../Context/LocalStorageContext";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { token } = useContext(LocalStorageProvider);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
