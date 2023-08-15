import React, { useEffect, useState } from "react";
import Input from "./Input/Input";
import { GET_CATEGORY } from "../../Api/Index";
import useFetch from "../../Hooks/useFetch";
import { FaAngleDown } from "react-icons/fa6";
import Validation from "./Validation";
import Error from "../../components/Form/Error/Error";

import "./Index.scss";

const Index = () => {
  const { register, onSubmit, handleSubmit, errors } = Validation();
  const [img, setImg] = useState("");
  const [category, setCategory] = useState([]);
  const [select, setSelect] = useState("select");
  const { request } = useFetch();

  const handleImgChange = ({ target }) => {
    const result = Array.from(target.files).map((img) => {
      return {
        preview: URL.createObjectURL(img),
      };
    });

    setImg(result);
  };

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_CATEGORY();
      const { json } = await request(url, options);
      setCategory(json);
    };
    getCategory();
  }, [request]);

  return (
    <section className="salesContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="salesImg">
          <span className="textPreviw">Preview Image</span>
          <div className="previewImg">
            {img.length
              ? img.map((item, index) => (
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
              : ""}
          </div>
          <div className="inputFileContainer">
            <input
              type="file"
              onChange={handleImgChange}
              multiple
              {...register("inputFile")}
            />
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
          {errors.name && <p>{errors.productName.message}</p>}
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
          <label htmlFor="category">Category</label>
          <div className="selectContainer">
            <select
              value={select}
              name="category"
              id="category"
              onChange={(e) => setSelect(e.target.value)}
              {...register("category")}
            >
              <option disabled value="select">
                Select
              </option>
              {category &&
                category.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
            </select>
            <FaAngleDown />
          </div>
          <div className="salesDescription">
            <label htmlFor="Description" {...register("description")}>
              Description
            </label>
            <textarea rows="10"></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Index;
