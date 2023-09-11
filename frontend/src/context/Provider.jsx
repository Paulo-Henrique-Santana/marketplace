import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { GET_CATEGORY } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

const Provider = ({ children }) => {
  const { request } = useFetch();
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("key") || "");
  const [loggedUser, setloggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
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
      const { json } = await request(url, options);
      setCategory(json);
    };
    getCategory();
  }, [request]);

  const value = {
    token,
    setToken,
    loggedUser,
    setloggedUser,
    category,
    setCategory,
    categoryName,
    setCategoryName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
