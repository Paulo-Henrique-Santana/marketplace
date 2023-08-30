import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { FAVORITES_PRODUCTY, GET_PRODUCTS } from "../../../Api/Index";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";

import "./Index.scss";
// AiOutlineHeart

const Home = ({ useFilters }) => {
  const [filters] = useFilters;

  const { request, loading } = useFetch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      // console.log(filters);
      const { url, options } = GET_PRODUCTS(filters);
      const { json } = await request(url, options);
      setProducts(json);
    };
    getCategory();
    // console.log(products.items);
  }, [filters, request, setProducts]);

  const postFavorite = (product) => {
    console.log(product);
    const { url, options } = FAVORITES_PRODUCTY({
      id: product.id,
      idUser: 1,
      idProduct: product.name,
    });
    const { response, json } = request(url, options);
    console.log(json, response);
  };

  if (products.items)
    return (
      <section className="productContainer">
        {loading && <p>Loading</p>}
        <ul>
          {products.items.map((product) => (
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
                  <AiOutlineHeart />
                  {/* <FaCartShopping /> */}
                </button>
              </div>
              <p className="price">R${product.price}</p>
            </li>
          ))}
        </ul>
        {!products.items.length && <p>Product not found</p>}
      </section>
    );
};

export default Home;
