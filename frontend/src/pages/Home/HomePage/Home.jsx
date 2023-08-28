import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { GET_PRODUCTS } from "../../../Api/Index";
import AppContext from "../../../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// AiOutlineHeart

const Home = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const { request } = useFetch();
  const { products, setProducts } = useContext(AppContext);

  const [filter, setFilter] = useState({
    idCategory: null,
  });

  useEffect(() => {
    setFilter({ idCategory: query.get("idCategory") });
  }, [query]);

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_PRODUCTS(filter);
      const { json } = await request(url, options);
      setProducts(json);
    };
    getCategory();
  }, [filter, request, setProducts]);

  if (products.items)
    return (
      <section className="productContainer">
        <ul>
          {products.items.length
            ? products.items.map((product) => (
                <li key={product.id}>
                  <Link to={`product/${product.id}`}>
                    <div className="containerImg">
                      <img
                        src={`http://localhost:3000/api/files/${product.images[0].fileName}`}
                      />
                    </div>

                    <div className="containerName">
                      <p className="name">{product.name}</p>
                      <button>
                        <AiOutlineHeart />
                      </button>
                    </div>
                    <p className="price">R${product.price}</p>
                  </Link>
                </li>
              ))
            : "loading..."}
        </ul>
      </section>
    );
};

export default Home;
