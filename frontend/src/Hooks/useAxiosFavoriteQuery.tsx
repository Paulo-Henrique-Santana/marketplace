import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { axiosInstance } from "../Api/Index";
import { ImagesProps, FavoriteProps } from "../Types/Index";


const fetchData = async (url: any, params: any) => {
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
  return response.data.items;
};

const deleteFavorite = async (itemId: number) => {
  await axiosInstance.delete("favorite/" + itemId);
};

const postFavorite = async (body) => {
  console.log(body);

  let url = "favorite";
  return await axiosInstance.post(url, JSON.stringify(body));
};

export const useAxiosQuery = (queryKey: any, url, params?: any) => {
  return useQuery([queryKey, params], () => fetchData(url, params));
};

export const useAxiosDelete = (key) => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryCliente.invalidateQueries(key);
    },
  });

  return mutate;
};

export const usePostFavoriteAxios = () => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      queryCliente.invalidateQueries("products");
    },
  });

  return mutate;
};
