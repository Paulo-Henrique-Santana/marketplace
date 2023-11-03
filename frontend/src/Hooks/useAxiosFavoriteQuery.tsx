import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { ImagesProps, FavoriteProps } from "../Types/Index";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
};

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

  const response = await axiosInstance.get(url, headers);
  return response.data.items;
};

const deleteFavorite = async (itemId: number) => {
  await axiosInstance.delete("favorite/" + itemId, headers);
};

const postFavorite = async (params) => {
  await axiosInstance.post(params.url, params.data);
};

export const useAxiosQuery = (queryKey: any, url: string, params?: any) => {
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
