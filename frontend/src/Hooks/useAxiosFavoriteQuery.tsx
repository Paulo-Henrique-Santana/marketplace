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

const getData = async (url: any, params: any) => {
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
  return response.data;
};

const deleteData = async (itemId: number) => {
  await axiosInstance.delete("favorite/" + itemId, headers);
};

const postData = async (params) => {
  await axiosInstance.post(params.url, params.data);
};

export const useAxiosQueryGet = (queryKey: any, url: string, params?: any) => {
  console.log(queryKey, url);

  return useQuery([queryKey, params], () => getData(url, params));
};

export const useAxiosQueryDelete = (key) => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryCliente.invalidateQueries(key);
    },
  });

  return mutate;
};

export const useAxiosQueryPost = () => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryCliente.invalidateQueries("products");
    },
  });

  return mutate;
};
