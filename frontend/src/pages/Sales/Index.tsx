import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { CategoryContext } from "../../Context/CategoryContext";
import { useFormData } from "../../Hooks/useFormData";
import Validation from "./Validation";
import Error from "../../components/Form/Error/Index";
import Input from "./Input/Input";

import "./Index.scss";

const salesProduct = () => {
  const { register, handleSubmit, reset, errors } = Validation();
  const { category } = useContext(CategoryContext);
  const { handleImgChange, imgs, onSubmit } = useFormData(reset);

  return (
    <section className="salesContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="salesImg">
          <ToastContainer position="top-right" autoClose={3000} />
          <span className="textPreviw">Preview Image</span>
          <div className="previewImg">
            {imgs.length ? (
              imgs.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: `no-repeat center/100% url("${item.preview}") `,
                    backgroundSize: "400px",
                  }}
                >
                  {" "}
                </div>
              ))
            ) : (
              <div className="recommendedPhoto">
                <p>Recommended photos with 400 x 400</p>
              </div>
            )}
          </div>

          <div className="inputFileContainer">
            <input type="file" onChange={handleImgChange} multiple required />
            <button>Send</button>
          </div>
        </div>
        <div className="salesForm">
          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Product name"
            placeholder="Samsung S10 Plus"
            register={register}
            validation="productName"
          />
          {errors.productName && <Error error={errors.productName.message} />}

          <Input
            htmlFor="price"
            type="number"
            name="price"
            id="price"
            text="Price"
            placeholder="Example: Gabriel "
            register={register}
            validation="price"
          />
          {errors.price && <Error error={errors.price.message} />}

          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Quantity"
            placeholder="Example: Gabriel "
            register={register}
            validation="quantity"
          />
          {errors.quantity && <Error error={errors.quantity.message} />}
          <label htmlFor="category">Category</label>

          <div className="selectContainer">
            <select id="category" {...register("category")}>
              {category &&
                category.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
            </select>
            <FaAngleDown />
          </div>

          <div className="salesDescription">
            <label htmlFor="Description">Description</label>
            <textarea rows={10} {...register("description")}></textarea>
            {errors.description && <Error error={errors.description.message} />}
          </div>
        </div>
      </form>
    </section>
  );
};

export default salesProduct;
