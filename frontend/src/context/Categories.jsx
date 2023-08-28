import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { GET_CATEGORY, USERS_GET } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

const Categories = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const { request } = useFetch();

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_CATEGORY();
      const { json } = await request(url, options);
      setCategory(json);
    };
    getCategory();
  }, [request]);

  const value = {
    category,
    setCategory,
    categoryName,
    setCategoryName,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Categories;
