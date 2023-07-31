import React from "react";
import { FaDumpster } from "react-icons/fa6";
import "./Index.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <h1>
      <Link>
        <FaDumpster />
        Marketplace
      </Link>
    </h1>
  );
};

export default Logo;
