import React, { createContext, useEffect, useState } from "react";
import { GET_CATEGORY } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

type LocalStorageProps = {
  children: React.ReactNode;
};

type LocalStorageContext = {
  token?: any | undefined;
  setToken?: React.Dispatch<React.SetStateAction<string>> | any;
  loggedUser?: any;
  setloggedUser?: any;
};

export const LocalStorageContext = createContext<LocalStorageContext>(
  {} as LocalStorageContext
);

export const LocalStorageProvider = ({ children }: LocalStorageProps) => {
  const [token, setToken] = useState(localStorage.getItem("key") || "");
  const [loggedUser, setloggedUser] = useState(
    JSON.parse(localStorage.getItem("user")!) || ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("key", token);
    } else {
      localStorage.removeItem("key");
    }
  }, [token]);

  useEffect(() => {
    if (loggedUser) localStorage.setItem("user", JSON.stringify(loggedUser));
    else localStorage.removeItem("user");
  }, [loggedUser]);

  return (
    <LocalStorageContext.Provider
      value={{
        token,
        setToken,
        loggedUser,
        setloggedUser,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
