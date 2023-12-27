import React, { useState } from "react";
import { FormDataPayload, ResetProps, ResultProps } from "../Types/Product";
import { useAxiosPostProduct } from "./useAxiosProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const separator = (numb: string) => {
  const str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return str.join(".");
};

export const useFormData = (reset: ResetProps) => {
  const [imgs, setImg] = useState<ResultProps[]>([]);
  const { mutate, error } = useAxiosPostProduct();

  const onSubmit = async (data: FormDataPayload) => {
    const formData = new FormData();
    imgs.forEach((img: { file: File }) => formData.append("image", img.file));

    formData.append("name", data.productName);
    formData.append("price", separator(data.price));
    formData.append("quantity", data.quantity);
    formData.append("idCategory", data.category);
    formData.append("description", data.description);
    formData.append("idUser", "1");

    mutate({ url: "product", data: formData });
    reset();
    setImg([]);
    if (!error) toast.success("Sent successfully");
  };

  const handleImgChange = ({ target }: { target: HTMLInputElement }) => {
    const result = Array.from(target.files!).map((img: any) => {
      return {
        preview: URL.createObjectURL(img),
        file: img,
      };
    });

    setImg(result);
  };

  return {
    imgs,
    onSubmit,
    handleImgChange,
  };
};
