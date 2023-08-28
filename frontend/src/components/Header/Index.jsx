import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { GET_PRODUCTS } from "../../Api/Index";
import useFetch from "../../Hooks/useFetch";

import "./Index.scss";

const Header = ({ useFilters }) => {
  const { token, loginName, setToken, setLoginName, category } =
    useContext(AppContext);
  const { request } = useFetch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useFilters;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [filters]);

  const handleClick = () => {
    setToken("");
    setLoginName("");
  };

  const handleClickCategory = async (id) => {
    setFilters({ ...filters, idCategory: id });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilters({ ...filters, search: search });
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
          <Logo link="/" />
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
              <li className="loginName">
                <Link>
                  <FaUserLarge />
                  {loginName}
                  <FaAngleDown />
                </Link>

                <ul className="subMenu">
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
              <Link>
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
