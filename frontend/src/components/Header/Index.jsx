import React, { useContext, useEffect, useState } from "react";
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
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setToken("");
    setLoginName("");
  };

  const dropMenu = () => {
    setActive(true);
  };

  window.addEventListener("click", (e) => {
    console.log(e.target);
    e.setActive(false);
  });

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
          <form className="inputContainer">
            <input type="text" />
            <button>
              <FaMagnifyingGlass />
            </button>
          </form>
          <ul className="menu">
            {token && (
              <li className="loginName" onClick={dropMenu}>
                <Link>
                  <FaUserLarge />
                  {loginName}
                  <FaAngleDown />
                </Link>
                <ul className={`subMenu ${active ? "active" : ""}`}>
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

                  <li>
                    <Link>
                      <FaBuildingColumns />
                      Sell
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleClick} to="/login">
                      <FaArrowRightFromBracket />
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li style={token ? { display: "none" } : { display: "block" }}>
              <Link to="/login">
                <FaUserLarge />
                Enter
              </Link>
            </li>

            <li style={token ? { display: "none" } : { display: "block" }}>
              <Link>
                <FaCartShopping />
                Cart
              </Link>
            </li>
            <li style={token ? { display: "none" } : { display: "block" }}>
              <Link>
                <FaHeart />
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* <div className="inputContainer">
        <form>
          <input type="text" />
          <button>
            <FaMagnifyingGlass />
          </button>
        </form>
      </div> */}
    </>
  );
};

export default Header;
