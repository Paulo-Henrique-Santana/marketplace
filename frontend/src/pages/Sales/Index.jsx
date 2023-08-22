import React, { useEffect, useState } from "react";
import Input from "./Input/Input";
import { GET_CATEGORY, PHOTO_POST } from "../../Api/Index";
import useFetch from "../../Hooks/useFetch";
import { FaAngleDown } from "react-icons/fa6";
import Validation from "./Validation";
import Error from "../../components/Form/Error/Error";

import "./Index.scss";

const Index = () => {
  const { register, handleSubmit, reset, errors } = Validation();
  const [img, setImg] = useState("");
  const [category, setCategory] = useState([]);
  const [select, setSelect] = useState("select");
  const { request } = useFetch();

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", img[0].file);
    formData.append("name", data.productName);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("idCategory", data.category);
    formData.append("description", data.description);
    formData.append("idUser", 1);

    const { url, options } = PHOTO_POST(formData);
    request(url, options);

    reset();
  };

  const handleImgChange = ({ target }) => {
    const result = Array.from(target.files).map((img) => {
      return {
        preview: URL.createObjectURL(img),
        file: img,
      };
    });

    console.log(target.files);
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
            {img.length ? (
              img.map((item, index) => (
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
              <p>Recommended photos with 400 x 400</p>
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
            <select
              value={select}
              name="category"
              id="category"
              onChange={(e) => setSelect(e.target.value)}
            >
              <option disabled value="select">
                Select
              </option>
              {category &&
                category.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                    {...register("category")}
                  >
                    {product.name}
                  </option>
                ))}
            </select>
            <FaAngleDown />
          </div>
          {errors.category && <Error error={errors.category.message} />}

          <div className="salesDescription">
            <label htmlFor="Description">Description</label>
            <textarea rows="10" {...register("description")}></textarea>
            {errors.description && <Error error={errors.description.message} />}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Index;
