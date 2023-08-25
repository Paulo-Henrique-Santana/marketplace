import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { USERS_GET } from "../Api/Index";
import useFetch from "../Hooks/useFetch";

const Categories = ({ children }) => {
  const { request } = useFetch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const ola = async () => {
      const { url, options } = USERS_GET();
      const { json } = await request(url, options);
      setUsers(json);
    };
    ola();
  }, [request]);

  const value = {
    users,
    setUsers,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Categories;
