import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMagnifyingGlass,
  FaAngleDown,
  FaCircleQuestion,
  FaDumpster,
  FaUserLarge,
  FaArrowRightFromBracket,
  FaCartShopping,
  FaHeart,
  FaBuildingColumns,
} from "react-icons/fa6";
import Logo from "../Logo/Logo";
import AppContext from "../../context/AppContext";

import "./Index.scss";

const Header = () => {
  const { token, loginName, setToken, setLoginName } = useContext(AppContext);

  const handleClick = () => {
    setToken("");
    setLoginName("");
  };

  return (
    <>
      <div className="navTopBar">
        <ul className="topBar">
          <li>By: Paulo Henrique and Gabriel Silva</li>
          <li>
            <p>
              Eng. <FaAngleDown />
            </p>
            <p>
              Clear your doubts <FaCircleQuestion />
            </p>
          </li>
        </ul>
      </div>
      <header>
        <nav>
          <Logo />
          <ul>
            {token && (
              <li>
                <Link>
                  <FaUserLarge />
                  {loginName}
                </Link>
              </li>
            )}
            {token ? (
              <li>
                <Link onClick={handleClick} to="/">
                  <FaArrowRightFromBracket />
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/">
                  <FaUserLarge />
                  Enter
                </Link>
              </li>
            )}
            <li>
              <Link>
                <FaCartShopping />
                Cart
              </Link>
            </li>
            <li>
              <Link>
                <FaHeart />
                Favorites
              </Link>
            </li>
            {token && (
              <li>
                <Link>
                  <FaBuildingColumns />
                  Sell
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="inputContainer">
        <form>
          <input type="text" />
          <button>
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;
