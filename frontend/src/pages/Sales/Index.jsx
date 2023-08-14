import React, { useEffect, useState } from "react";
import Input from "./Input/Input";
import Validation from "../Login/Register/Validation";
import "./Index.scss";
import { GET_CATEGORY } from "../../Api/Index";
import useFetch from "../../Hooks/useFetch";

const Index = () => {
  const { register } = Validation();
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
      <form>
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

          <input type="file" onChange={handleImgChange} multiple />
        </div>
        <div className="salesForm">
          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Product name"
            placeholder="Samsung S10 Plus"
          />
          <Input
            htmlFor="price"
            type="text"
            name="price"
            id="price"
            text="Price"
            placeholder="Example: Gabriel "
          />
          <Input
            htmlFor="name"
            type="text"
            name="name"
            id="name"
            text="Quantidade"
            placeholder="Example: Gabriel "
          />
          <select
            value={select}
            name="category"
            id="category"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option disabled value="select">
              Select
            </option>
            {category.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <div className="salesDescription">
            <label htmlFor="Description">Description</label>
            <textarea rows="10"></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Index;
