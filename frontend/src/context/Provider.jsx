import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { GET_CATEGORY } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

const Provider = ({ children }) => {
  const { request } = useFetch();
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    idCategory: null,
  });
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
    loginName,
    setLoginName,
    category,
    setCategory,
    categoryName,
    setCategoryName,
    products,
    setProducts,
    filter,
    setFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
