import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../Api";
import {
  ParamsProducts,
  PostProductData,
  ProductData,
  ProductsData,
} from "../Types/Product";
import { AxiosResponse } from "axios";

export const useAxiosPostProduct = () => {
  const postData = async ({ url, data }: PostProductData) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  const mutation = useMutation(postData);

  return mutation;
};

export const useAxiosGetProducts = (
  url: string,
  queryKey: string,
  params?: any
) => {
  const getData = async (url: string, params?: ParamsProducts) => {
    if (params) {
      if (params.idCategory) {
        url += `idCategory=${params.idCategory}&`;
      }
      if (params.search) {
        url += `name=${params.search}&`;
      }
      if (params.idLoggedUser) {
        url += `idLoggedUser=${params.idLoggedUser}&`;
      }
    }

    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery<AxiosResponse<ProductsData>, Error, ProductsData>(
    [queryKey, params],
    () => getData(url, params)
  );
};
