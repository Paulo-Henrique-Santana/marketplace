import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LocalStorageContext } from "../../../Context/LocalStorageContext";
import Loading from "../../../components/Loading/Loading";
import {
  useAxiosDeleteFavorite,
  useAxiosPostFavorite,
} from "../../../Hooks/useAxiosFavorite";
import { useAxiosGetProducts } from "../../../Hooks/useAxiosProducts";
import { ProductData } from "../../../Types/Product";

import "./Index.scss";

const Home = ({ useFilters }: { useFilters: any }) => {
  const { mutate: addProduct } = useAxiosPostFavorite();
  const { mutate: deleteProduct } = useAxiosDeleteFavorite(["products"]);
  const [filters] = useFilters;
  const { loggedUser, token } = useContext(LocalStorageContext);
  const dataProducts = {
    ...filters,
    idLoggedUser: loggedUser.id,
  };

  const { data, isLoading, error } = useAxiosGetProducts(
    "/product?",
    "products",
    dataProducts
  );

  console.log(error);

  const toogleFavorite = (favoriteProduct: ProductData) => {
    const params = {
      url: "favorite",
      data: {
        idProduct: favoriteProduct.id,
        idUser: loggedUser.id,
      },
    };
    if (favoriteProduct.favorites?.length) {
      const id = favoriteProduct.favorites[0].id;
      deleteProduct(id);
    } else addProduct(params);
  };

  return (
    <section className="productContainer">
      {isLoading && <Loading />}
      {!data?.items && !isLoading && <p>Product not found</p>}
      <ul>
        {data?.items.map((product) => (
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
        ))}
      </ul>
    </section>
  );
};

export default Home;
