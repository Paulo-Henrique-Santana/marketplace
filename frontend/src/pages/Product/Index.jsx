import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./Index.scss";
import { USERS_GET } from "../../Api/Index";
import AppContext from "../../context/AppContext";

const Index = () => {
  const { data, request } = useFetch();
  const { id } = useParams();
  const [indexImg, setIndexImg] = useState(0);
  const [color, setColor] = useState(false);
  const { users } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      await request(`http://localhost:3000/api/product/${id}`);
    };
    fetchProduct();
    // if(users.id)
  }, [id, request]);

  const handleOnMouseEnter = (img, index) => {
    setIndexImg(index);
    // console.log(img);
    // if (img === index) {
    //   setColor(true);
    // }
  };

  // console.log(users[id].name);

  return (
    <div className="productDescription">
      {data ? (
        <div className="containerDescription">
          <div className="containerImg">
            <div className="imgs">
              {data.images &&
                data.images.map((img, index) => (
                  <img
                    key={img.id}
                    src={`http://localhost:3000/api/files/${img.fileName}`}
                    onMouseEnter={() => handleOnMouseEnter(img, index)}
                    // style={
                    //   color
                    //     ? { border: "1px solid red" }
                    //     : { border: "1px solid transparent" }
                    // }
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
            <button className="buy">Buy</button>
            <h2>Description</h2>
            <li>{data.description}</li>
          </ul>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Index;
