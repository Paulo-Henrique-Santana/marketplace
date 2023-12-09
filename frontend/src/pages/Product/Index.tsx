import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { LocalStorageContext } from "../../Context/LocalStorageContext";
import { useAxiosQueryGet, useGetRequest } from "../../Hooks/useAxiosFavoriteQuery";
import Loading from "../../components/Loading/Loading";

import "./Index.scss";

const Index = () => {
  const divImgs = useRef<HTMLInputElement | null>(null);
  const [indexImg, setIndexImg] = useState(0);
  const { id } = useParams();
  const { cart, setCart, loggedUser } = useContext(LocalStorageContext);
  const { data } = useAxiosQueryGet(
    "products",
    `product/${id}?idUser=${loggedUser.id}`
  );

  const handleOnMouseEnter = (
    event: React.MouseEvent<HTMLImageElement>,
    img: any,
    index: number
  ) => {
    setIndexImg(index);
    const imgs = divImgs.current?.querySelectorAll("img");
    imgs?.forEach((img) => {
      if (img !== event.target) {
        img.classList.remove("color");
      } else {
        img.classList.add("color");
      }
    });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")!);
    setCart(storedCart);
  }, []);

  const addToCart = (productId) => {
    if (!cart.includes(productId)) {
      const updatedCart = [...cart, productId];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="productDescription">
      {data ? (
        <div className="containerDescription">
          <div className="containerImg">
            <div className="imgs" ref={divImgs}>
              {data.images &&
                data.images.map((img, index: number) => (
                  <img
                    key={img.id}
                    src={`http://localhost:3000/api/files/${img.fileName}`}
                    onMouseEnter={(event) =>
                      handleOnMouseEnter(event, img, index)
                    }
                    className={index === 0 ? `color` : ""}
                  />
                ))}
            </div>
            <div className="img">
              {data.images && (
                <img
                  src={`http://localhost:3000/api/files/${data.images[indexImg].fileName}`}
                />
              )}
            </div>
          </div>
          <ul>
            <div>
              <li>{data.name}</li>
              <button className="heart">
                <AiOutlineHeart />
              </button>
            </div>

            <li>R${data.price}</li>
            <li>
              Quantity: <span className="quantity">{data.quantity}</span>
            </li>

            <h2>Description</h2>
            <li>{data.description}</li>
            <button className="btn">Buy</button>
            <button className="btn cart" onClick={() => addToCart(data.id)}>
              Add to Cart
            </button>
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Index;
