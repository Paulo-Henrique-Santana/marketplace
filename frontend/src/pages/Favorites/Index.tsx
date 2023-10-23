import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import {
  DELETE_FAVORITES_PRODUCTY,
  GET_FAVORITES_PRODUCTY,
} from "../../Api/Index";
import { LocalStorageProvider } from "../../Context/LocalStorageContext";
import { Link } from "react-router-dom";
import { AiFillCloseSquare, AiOutlineCloseCircle } from "react-icons/ai";
// AiFillCloseSquare
import "./Index.scss";

const Index = () => {
  const { request } = useFetch();
  const { loggedUser } = useContext(LocalStorageProvider);
  const [favoriteProduct, setFavoriteProduct] = useState([]);

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
  
  console.log(favoriteProduct);
  if (favoriteProduct.length)
    return (
      <section className="favoriteContainer">
        <ul>
          {favoriteProduct.map((item) => (
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
          ))}
        </ul>
      </section>
    );
};

export default Index;
