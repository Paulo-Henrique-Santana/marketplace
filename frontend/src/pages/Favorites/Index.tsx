import React, { useContext, useEffect, useState } from "react";
import { LocalStorageContext } from "../../Context/LocalStorageContext";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import { useAxiosDeleteFavorite } from "../../Hooks/useAxiosFavorite";
import "./Index.scss";
import { useAxiosGet } from "../../Hooks/useAxiosGet";
import { FavoriteData } from "../../Types/Favorite";

const Index = () => {
  const { mutate } = useAxiosDeleteFavorite(["favoriteProduct"]);
  const { loggedUser } = useContext(LocalStorageContext);
  const { data, isLoading } = useAxiosGet<FavoriteData>(
    "favorite?page=1&pageSize=10&idUser=" + loggedUser.id,
    "favoriteProduct"
  );

  return (
    <section className="favoriteContainer">
      {isLoading && <Loading />}
      {!data?.items.length && !isLoading && (
        <p>Does not have favorite items :(</p>
      )}
      <ul>
        {data?.items?.map((item) => (
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
                onClick={() => mutate(item.id)}
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
