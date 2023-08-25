import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

import "./Index.scss";

const Index = () => {
  const { data, request } = useFetch();
  const { id } = useParams();
  const [indexImg, setIndexImg] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      await request(`http://localhost:3000/api/product/${id}`);
    };
    fetchProduct();
  }, [id, request]);


  return (
    <div className="productDescription">
      {data ? (
        <div className="containerDescription">
          <div className="containerImg">
            <div className="imgs">
              {data.images &&
                data.images.map((img, index) => (
                  <img
                    src={`http://localhost:3000/api/files/${img.fileName}`}
                    onMouseEnter={() => setIndexImg(index)}
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
            <li>{data.name}</li>
            <li>R${data.price}</li>
            <button>Buy</button>
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
