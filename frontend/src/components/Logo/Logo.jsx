import React from "react";
import { FaDumpster } from "react-icons/fa6";
import "./Index.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Logo = (props) => {
  return (
    <h1>
      <Link to={props.link} {...props}>
        <FaDumpster />
        Marketplace
      </Link>
    </h1>
  );
};

export default Logo;
