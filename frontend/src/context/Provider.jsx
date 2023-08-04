import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [textInput, setTextInput] = useState("");
  const [color, serColor] = useState(false);

  const value = {
    textInput,
    setTextInput,
    color,
    serColor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
