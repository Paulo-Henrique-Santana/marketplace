import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import {
  DELETE_FAVORITES_PRODUCTY,
  GET_FAVORITES_PRODUCTY,
} from "../../Api/Index";
import { LocalStorageContext } from "../../Context/LocalStorageContext";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImagesProps } from "../../Types/Index";

import "./Index.scss";

type FavoriteProductProps = {
  id: number;
  idProduct: number;
  idUser: number;
  product: {
    price: number;
    name: string;
    images: ImagesProps;
  };
};

const Index = () => {
  const { request, loading } = useFetch();
  const { loggedUser } = useContext(LocalStorageContext);
  const [favoriteProduct, setFavoriteProduct] = useState<
    FavoriteProductProps[]
  >([]);

  useEffect(() => {
    const getFavorite = async () => {
      const { url, options } = GET_FAVORITES_PRODUCTY(loggedUser.id);
      const { json } = await request(url, true, options);

      setFavoriteProduct(json);
    };
    getFavorite();
  }, [loggedUser.id, request]);

  const deleteProduct = async () => {
    const { url, options } = DELETE_FAVORITES_PRODUCTY(favoriteProduct[0].id);
    await request(url, false, options);
    setFavoriteProduct((prevProducts) => {
      return prevProducts.filter((item) => item.id !== favoriteProduct[0].id);
    });
  };
  console.log(!favoriteProduct.length);

  return (
    <section className="favoriteContainer">
      {loading && <p>Loading...</p>}
      {!favoriteProduct.length && !loading && (
        <p>Does not have favorite items :(</p>
      )}
      <ul>
        {favoriteProduct.length
          ? favoriteProduct.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.idProduct}`}>
                  <div>
                    <img
                      src={`http://localhost:3000/api/files/${item.product.images[0].fileName}`}
                      alt=""
                      className="favoriteProduct"
                    />
                  </div>
                </Link>
                <div>
                  <div>
                    <p className="favoriteName">{item.product.name}</p>
                    <p>R${item.product.price}</p>
                  </div>
                  <AiOutlineCloseCircle
                    className="delete"
                    onClick={deleteProduct}
                  />
                </div>
                <button>Add to cart</button>
              </li>
            ))
          : ""}
      </ul>
    </section>
  );
};

export default Index;
