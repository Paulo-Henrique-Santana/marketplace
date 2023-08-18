import React, { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { GET_PRODUCTS } from "../../Api/Index";

const Home = () => {
  const { request } = useFetch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_PRODUCTS();
      const { json } = await request(url, options);
      setProducts(json);
    };
    getCategory();
  }, [request]);

  if (products.items)
    return (
      <section>
        <ul>
          {products.items.length
            ? products.items.map((product) => (
                <li key={product.id}>
                  <img
                    src={"http://localhost:3000/api/files/1691795392713.jpeg"}
                    alt=""
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
