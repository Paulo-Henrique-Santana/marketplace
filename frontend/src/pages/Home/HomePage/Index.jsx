import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { FAVORITES_PRODUCTY, GET_PRODUCTS } from "../../../Api/Index";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";

import "./Index.scss";
import AppContext from "../../../context/AppContext";
// AiOutlineHeart

const Home = ({ useFilters }) => {
  const [filters] = useFilters;

  const { request, loading } = useFetch();
  const [products, setProducts] = useState([]);
  const { loggedUser } = useContext(AppContext);

  useEffect(() => {
    const getProducts = async () => {
      const { url, options } = GET_PRODUCTS({
        ...filters,
        idLoggedUser: loggedUser.id,
      });
      const { json } = await request(url, options);
      setProducts(json.items);
    };
    getProducts();
  }, [filters, request, setProducts]);

  const postFavorite = async (product) => {
    if (products[0].favorites.length) {
      setProducts({ favorites: [] });
    } else {
      const { url, options } = FAVORITES_PRODUCTY({
        idProduct: product.id,
        idUser: loggedUser.id,
      });
      const { json } = await request(url, options);

      setProducts(
        products.map((item) => {
          if (item.id === product.id) {
            console.log(item);
            return { ...item, favorites: [json] };
          }
          return item;
        })
      );
    }
  };
  console.log(products);
  if (products.length)
    return (
      <section className="productContainer">
        {loading && <p>Loading</p>}
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`product/${product.id}`}>
                <div className="containerImg">
                  <img
                    src={`http://localhost:3000/api/files/${product.images[0].fileName}`}
                  />
                </div>
              </Link>
              <div className="containerName">
                <p className="name">{product.name}</p>
                <button onClick={() => postFavorite(product)}>
                  {product.favorites.length ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </button>
              </div>
              <p className="price">R${product.price}</p>
            </li>
          ))}
        </ul>
        {!products.length && <p>Product not found</p>}
      </section>
    );
};

export default Home;
