import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./Index.scss";


const Index = () => {
  const { data, request } = useFetch();
  const { id } = useParams();
  const [indexImg, setIndexImg] = useState(0);
  const divImgs = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      await request(`http://localhost:3000/api/product/${id}`);
    };
    fetchProduct();
  }, [id, request]);

  const handleOnMouseEnter = (event, img, index) => {
    setIndexImg(index);
    const imgs = divImgs.current.querySelectorAll("img");
    imgs.forEach((img) => {
      if (img !== event.target) {
        img.classList.remove("color");
      } else {
        img.classList.add("color");
      }
    });
  };


  return (
    <div className="productDescription">
      {data ? (
        <div className="containerDescription">
          <div className="containerImg">
            <div className="imgs" ref={divImgs}>
              {data.images &&
                data.images.map((img, index) => (
                  <img
                    key={img.id}
                    src={`http://localhost:3000/api/files/${img.fileName}`}
                    onMouseEnter={(event) =>
                      handleOnMouseEnter(event, img, index)
                    }
                    className={index === 0 && `color`}
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
            <button className="btn cart">Add to Cart</button>
          </ul>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Index;
