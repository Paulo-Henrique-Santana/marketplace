import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { GET_PRODUCTS } from "../../../Api/Index";
import AppContext from "../../../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
  }, [filters, request, setProducts]);

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

                <div className="containerName">
                  <p className="name">{product.name}</p>
                  <button>
                    <AiOutlineHeart />
                  </button>
                </div>
                <p className="price">R${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
        {!products.items.length && <p>Product not found</p>}
      </section>
    );
};

export default Home;
