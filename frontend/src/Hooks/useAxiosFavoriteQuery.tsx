import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { axiosInstance } from "../Api/Index";
import { ImagesProps, FavoriteProps } from "../Types/Index";

const fetchData = async (url: string) => {
  const response = await axiosInstance.get<FavoriteProps[]>(url);
  return response.data;
};

const deleteFavorite = async (itemId: number) => {
  await axiosInstance.delete("favorite/" + itemId);
};

const postFavorite = async (body) => {
  let url = "favorite";
  return await axiosInstance.post(url, JSON.stringify(body));
};

export const useAxiosQuery = (queryKey: string[], url: string) => {
  return useQuery(queryKey, () => fetchData(url));
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
      queryCliente.invalidateQueries(["products"]);
    },
  });

  return mutate;
};
