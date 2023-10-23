import React, { createContext, useEffect, useState } from "react";
import { GET_CATEGORY } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

type LocalStorageProps = {
  children: React.ReactNode;
};

type CategoryProps = {
  id: number;
  name: string;
};

type LocalStorageProviderProps = {
  category?: CategoryProps[];
  setCategory?: React.Dispatch<React.SetStateAction<never[]>>;
  categoryName?: any | undefined;
  setCategoryName?: React.Dispatch<React.SetStateAction<never[]>>;
  token?: any | undefined;
  setToken?: React.Dispatch<React.SetStateAction<string>> | any;
  loggedUser?: any;
  setloggedUser?: any;
};

export const LocalStorageProvider = createContext<LocalStorageProviderProps>(
  {} as LocalStorageProviderProps
);

const LocalStorageContext = ({ children }: LocalStorageProps) => {
  const { request } = useFetch();
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("key") || "");
  const [loggedUser, setloggedUser] = useState(
    JSON.parse(localStorage.getItem("user") || "")
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

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_CATEGORY();
      const { json } = await request(url, true, options);
      setCategory(json);
    };
    getCategory();
  }, [request]);

  return (
    <LocalStorageProvider.Provider
      value={{
        token,
        setToken,
        loggedUser,
        setloggedUser,
        category,
        setCategory,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </LocalStorageProvider.Provider>
  );
};

export default LocalStorageContext;
