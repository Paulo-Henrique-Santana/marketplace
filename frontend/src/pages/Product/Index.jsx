import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

import "./Index.scss";

const Index = () => {
  const { data, request } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      await request(`http://localhost:3000/api/product/${id}`);
    };
    fetchProduct();
  }, [id, request]);

  console.log(data);

  return (
    <div className="productDescription">
      {data ? (
        <div className="containerDescription">
          <div className="containerImg">
            {data.images &&
              data.images.map((img) => (
                <img src={`http://localhost:3000/api/files/${img.fileName}`} />
              ))}
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
