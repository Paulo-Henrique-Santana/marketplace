import React, { useContext, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import useFetch from "../../Hooks/useFetch";
import { LocalStorageContext } from "../../Context/LocalStorageContext";

import "./Index.scss";

const Index = () => {
  const { data } = useFetch();
  const { cart, setCart } = useContext(LocalStorageContext);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((id) => id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cart?.length)
    return (
      <section className="cartContainer">
        <div className="cartItems">
          {cart.images &&
            cart.images.map((img, index: number) => (
              <img
                key={img.id}
                src={`http://localhost:3000/api/files/${img.fileName}`}
              />
            ))}
          <div className="cartResume">
            <p>{cart[0].name}</p>
            <p>Vendendor: Gabriel Silva</p>
            <p>Celular</p>
            <button onClick={() => removeFromCart(cart.id)}>
              <FaTrashCan />
            </button>
          </div>
          <div className="cartValues">
            <p>Quantidade: </p>
            <div>
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Index;
