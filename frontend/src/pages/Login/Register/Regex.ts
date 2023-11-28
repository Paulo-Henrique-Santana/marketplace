import React from "react";

const Regex = () => {
  const passwordRegex =
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  const cpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
  return {
    passwordRegex,
    cpfRegex,
  };
};

export default Regex;
