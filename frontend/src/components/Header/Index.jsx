import React from "react";
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

import "./Index.scss";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <>
      <div className="navTopBar">
        <ul className="topBar">
          <li>By: Paulo Henrique and Gabriel</li>
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
            <li>
              <FaUserLarge />
              <Link>User</Link>
            </li>
            <li>
              <FaArrowRightFromBracket />
              <Link>Enter</Link>
            </li>
            <li>
              <FaCartShopping />
              <Link>Cart</Link>
            </li>
            <li>
              <FaHeart />
              <Link>Favorites</Link>
            </li>
            <li>
              <FaBuildingColumns />
              <Link>Sell</Link>
            </li>
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
