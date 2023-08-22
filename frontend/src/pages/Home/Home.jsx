import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { GET_PRODUCTS } from "../../Api/Index";
import AppContext from "../../context/AppContext";

const Home = () => {
  const { request } = useFetch();
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_PRODUCTS();
      const { json } = await request(url, options);
      setProducts(json);
    };
    getCategory();
  }, [request, setProducts]);

  if (products.items)
    return (
      <section>
        <ul>
          {products.items.length
            ? products.items.map((product) => (
                <li key={product.id}>
                  <img
                    src={`http://localhost:3000/api/files/${product.images[0].fileName}`}
                  />
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <p>{product.quantity}</p>
                  <p>{product.quantity}</p>
                  <p>{product.description}</p>
                </li>
              ))
            : "loading..."}
        </ul>
      </section>
    );
};

export default Home;
