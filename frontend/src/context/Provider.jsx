import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [text, setText] = useState("");

  const value = {
    text,
    setText,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
