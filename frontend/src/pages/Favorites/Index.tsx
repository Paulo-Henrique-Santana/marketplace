import React, { useContext, useEffect, useState } from "react";
import { LocalStorageContext } from "../../Context/LocalStorageContext";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import {
  useAxiosQuery,
  useAxiosDelete,
} from "../../Hooks/useAxiosFavoriteQuery";

import "./Index.scss";

const Index = () => {
  const { mutate } = useAxiosDelete(["favoriteProduct"]);
  const { loggedUser } = useContext(LocalStorageContext);

  const { data, isLoading } = useAxiosQuery(
    ["favoriteProduct"],
    "favorite?idUser=" + loggedUser.id
  );

  return (
    <section className="favoriteContainer">
      {isLoading && <Loading />}
      {!data && !isLoading && <p>Does not have favorite items :(</p>}
      <ul>
        {data
          ? data.map((item) => (
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
            ))
          : ""}
      </ul>
    </section>
  );
};

export default Index;
