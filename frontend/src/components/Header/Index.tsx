import React, { useContext, useState } from "react";
import {
  FaAngleDown,
  FaArrowRightFromBracket,
  FaBuildingColumns,
  FaCartShopping,
  FaCircleQuestion,
  FaHeart,
  FaMagnifyingGlass,
  FaUserLarge,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageContext } from "../../Context/LocalStorageContext";
import { CategoryContext } from "../../Context/CategoryContext";
import Logo from "../Logo/Logo";
import Cart from "../../pages/Cart/Index";

import "./Index.scss";

const Header = ({ useFilters }) => {
  const { token, loggedUser, setToken, setloggedUser } =
    useContext(LocalStorageContext);
  const { category } = useContext(CategoryContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useFilters;

  const handleClickLogo = () => {
    setFilters({});
    setSearch("");
  };

  const handleClick = () => {
    setToken("");
    setloggedUser("");
  };

  const handleClickCategory = async (id) => {
    setFilters({ idCategory: id });
    setSearch("");
    navigate("/");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilters({ ...filters, search: search });
    navigate("/");
  };

  return (
    <>
      <div className="navTopBar">
        <ul className="topBar">
          <li>By: Paulo Henrique and Gabriel Silva</li>
          <li>
            <p>
              Clear your doubts <FaCircleQuestion />
            </p>
          </li>
        </ul>
      </div>
      <header>
        <nav>
          <Logo onClick={handleClickLogo} to="/" />
          <form className="inputContainer" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button>
              <FaMagnifyingGlass />
            </button>
          </form>
          <ul className="menu">
            {token && (
              <li className="categories">
                Categories <FaAngleDown />
                <ul className="subMenuCategories">
                  {category &&
                    category.map((cat) => (
                      <li
                        key={cat.id}
                        onClick={() => handleClickCategory(cat.id)}
                      >
                        <p>{cat.name}</p>
                      </li>
                    ))}
                </ul>
              </li>
            )}
            {token && (
              <li className="loggedUser">
                <span className="userName">
                  <FaUserLarge />
                  {loggedUser && loggedUser.name.split(" ")[0]}
                  <FaAngleDown />
                </span>

                <ul className="subMenu">
                  <li>
                    <Link to="/cart">
                      <FaCartShopping />
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/favorites">
                      <FaHeart />
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link to="/sales">
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
            <li
              style={token ? { display: "none" } : { display: "block" }}
              className="li-home"
            >
              <Link to="/login">
                <FaUserLarge />
                Enter
              </Link>
            </li>
            <li
              style={token ? { display: "none" } : { display: "block" }}
              className="li-home"
            >
              <Link to="/cart">
                <FaCartShopping />
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
