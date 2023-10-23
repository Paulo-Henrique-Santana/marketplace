import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import {
  DELETE_FAVORITES_PRODUCTY,
  FAVORITES_PRODUCTY,
  GET_PRODUCTS,
} from "../../../Api/Index";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LocalStorageProvider } from "../../../Context/LocalStorageContext";

import "./Index.scss";

type ProductProps = {
  id: number;
  favorites?: Array<{
    id: number;
    idProduct: number;
    idUser: number;
  }>;
  description: string;
  images: Array<{
    id: number;
    fileName: string;
    idProdyct: number;
  }>;
  name: string;
  price: string;
  quantity: number;
};

const Home = ({ useFilters }) => {
  const [filters] = useFilters;
  const { request, loading, error } = useFetch();
  const [products, setProducts] = useState<ProductProps | any>([]);
  const { loggedUser } = useContext(LocalStorageProvider);

  useEffect(() => {
    const getProducts = async () => {
      const { url, options } = GET_PRODUCTS({
        ...filters,
        idLoggedUser: loggedUser.id,
      });
      const { json } = await request(url, true, options);
      setProducts(json.items);
    };
    getProducts();
  }, [filters]);

  const toogleFavorite = async (favoriteProduct: ProductProps) => {
    if (favoriteProduct.favorites?.length) {
      console.log(favoriteProduct.favorites[0].id);
      const { url, options } = DELETE_FAVORITES_PRODUCTY(
        favoriteProduct.favorites[0].id
      );
      await request(url, false, options);
      setProducts((prevProducts: ProductProps[]) => {
        return prevProducts.map((item: ProductProps) => {
          if (item.id === favoriteProduct.id) {
            return { ...item, favorites: [] };
          }
          return item;
        });
      });
    } else {
      const { url, options } = FAVORITES_PRODUCTY({
        idProduct: favoriteProduct.id,
        idUser: loggedUser.id,
      });
      const { json } = await request(url, false, options);
      setProducts((prevProducts: ProductProps[]) => {
        return prevProducts.map((item: ProductProps) => {
          if (item.id === favoriteProduct.id) {
            return { ...item, favorites: [json] };
          }
          return item;
        });
      });
    }
  };

  return (
    <section className="productContainer">
      {loading && <p>Loading</p>}
      {!products.length && !loading && <p>Product not found</p>}
      <ul>
        {products.length
          ? products.map((product: ProductProps) => (
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
                  <button onClick={() => toogleFavorite(product)}>
                    {product.favorites?.length ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
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
