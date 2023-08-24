import React, { useState } from "react";
import AppContext from "./AppContext";

const Categories = ({ children }) => {
 

  const value = {
    idCategory,
    setIdCategory,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Categories;
