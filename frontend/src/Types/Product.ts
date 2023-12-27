import { UseFormReset } from "react-hook-form";

export type FormDataPayload = {
  category: string;
  description: string;
  price: string;
  productName: string;
  quantity: string;
};

export type PostProductData = {
  url: string;
  data: FormData;
};

export type GetProductData = {
  url: string;
  queryKey: string;
};

export type ResetProps = UseFormReset<{
  productName: string;
  price: string;
  quantity: string;
  description: string;
  category: string;
}>;

export type ResultProps = {
  preview: string;
  file: any;
};

export type ImagesProps = {
  id: number;
  fileName: string;
  idProduct: number;
};

export type ParamsProducts = {
  idCategory: number;
  search: string;
  idLoggedUser: number;
};

export type ProductData = {
  description: string;
  favorites: any[];
  id: number;
  idCategory: number;
  idUser: number;
  images: ImagesProps[];
  name: string;
  price: string;
  quantity: number;
};

export type ProductsData = {
  hasNext: false;
  items: ProductData[];
};
