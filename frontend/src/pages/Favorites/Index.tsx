import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { GET_FAVORITES_PRODUCTY } from "../../Api/Index";
import { LocalStorageProvider } from "../../Context/LocalStorageContext";

const Index = () => {
  const { request } = useFetch();
  const { loggedUser } = useContext(LocalStorageProvider);
  const [favoriteProduct, setFavoriteProduct] = useState("");

  useEffect(() => {
    const getFavorite = async () => {
      const { url, options } = GET_FAVORITES_PRODUCTY(loggedUser.id);
      const { json } = await request(url, options);

      setFavoriteProduct(json);
    };
    getFavorite();
  }, [loggedUser.id, request]);

  if (favoriteProduct)
    return (
      <section>
        <ul>
          {favoriteProduct.map((item) => (
            <li key={item.id}>
              {/* <img
                src={`http://localhost:3000/api/files/${item.Product.images[0].fileName}`}
                alt=""
              />
              <p>{item.Product.name}</p> */}
            </li>
          ))}
        </ul>
      </section>
    );
};

export default Index;
