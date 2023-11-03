import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { CategoryContext } from "../../Context/CategoryContext";
import { useAxiosQueryPost } from "../../Hooks/useAxiosFavoriteQuery";
import Validation from "./Validation";
import Error from "../../components/Form/Error/Index";
import Input from "./Input/Input";

import "./Index.scss";
import "react-toastify/dist/ReactToastify.css";

type OnSubmitData = {
  category: string;
  description: string;
  price: string;
  productName: string;
  quantity: string;
};

type ResultProps = {
  preview: string;
  file: any;
};

const Index = () => {
  const { register, handleSubmit, reset, errors } = Validation();
  const { category } = useContext(CategoryContext);
  const [imgs, setImg] = useState<ResultProps[]>([]);
  const { mutate, error } = useAxiosQueryPost();

  function separator(numb: string) {
    const str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  const onSubmit = async (data: OnSubmitData) => {
    const formData = new FormData();
    imgs.forEach((img: { file: File }) => formData.append("image", img.file));

    formData.append("name", data.productName);
    formData.append("price", separator(data.price));
    formData.append("quantity", data.quantity);
    formData.append("idCategory", data.category);
    formData.append("description", data.description);
    formData.append("idUser", "1");

    mutate({ data: formData, url: "product" });
    reset();
    setImg([]);
    if (!error) toast.success("Sent successfully");
  };

  const handleImgChange = ({ target }) => {
    const result = Array.from(target?.files).map((img: any) => {
      return {
        preview: URL.createObjectURL(img),
        file: img,
      };
    });

    setImg(result);
  };

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

export default Index;
