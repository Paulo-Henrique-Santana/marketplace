import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import { ImagesProps } from "../../../Types/Index";
import Loading from "../../../components/Loading/Loading";
import {
  useAxiosDelete,
  useAxiosQuery,
  usePostFavoriteAxios,
} from "../../../Hooks/useAxiosFavoriteQuery";

import "./Index.scss";

type ProductProps = {
  id: number;
  favorites?: Array<{
    id: number;
    idProduct: number;
    idUser: number;
  }>;
  description: string;
  images: ImagesProps;
  name: string;
  price: string;
  quantity: number;
};

const Home = ({ useFilters }) => {
  const { mutate: addProduct } = usePostFavoriteAxios();
  const { mutate: deleteProduct } = useAxiosDelete(["products"]);
  const [filters] = useFilters;
  const { loggedUser, token } = useContext(LocalStorageContext);
  const dataProducts = {
    ...filters,
    idLoggedUser: loggedUser.id,
  };

  const { data, isLoading } = useAxiosQuery(
    "products",
    "/product?",
    dataProducts
  );

  const toogleFavorite = (favoriteProduct: ProductProps) => {
    if (favoriteProduct.favorites?.length) {
      const id = favoriteProduct.favorites[0].id;
      deleteProduct(id);
    } else {
      const params = {
        data: {
          idProduct: favoriteProduct.id,
          idUser: loggedUser.id,
        },  
        url: "favorite",
      };
      addProduct(params);
    }
  };

  return (
    <section className="productContainer">
      {isLoading && <Loading />}
      {!data && !isLoading && <p>Product not found</p>}
      <ul>
        {data
          ? data?.map((product: ProductProps) => (
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
                  {token && (
                    <button onClick={() => toogleFavorite(product)}>
                      {product.favorites?.length ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                  )}
                </div>
                <p className="price">R${product.price}</p>
              </li>
            ))
          : ""}
      </ul>
    </section>
  );
};

export default Home;
