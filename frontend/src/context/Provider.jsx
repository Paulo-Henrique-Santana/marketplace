import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [errorInputCpf, setErrorInputCpf] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");
  const [errorInputLogin, setErrorInputLogin] = useState("");
  const [token, setToken] = useState(localStorage.getItem("key") || "");
  const [loginName, setLoginName] = useState(
    localStorage.getItem("key2") || ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("key", token);
    } else {
      localStorage.removeItem("key");
    }
  }, [token]);

  useEffect(() => {
    if (loginName) localStorage.setItem("key2", loginName);
    else localStorage.removeItem("key2");
  }, [loginName]);

  const value = {
    errorInputCpf,
    setErrorInputCpf,
    errorInputEmail,
    setErrorInputEmail,
    errorInputLogin,
    setErrorInputLogin,
    token,
    setToken,
    loginName,
    setLoginName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
