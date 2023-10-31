import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { axiosInstance } from "../Api/Index";

const fetchData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const deleteFavorite = async (itemId) => {
  await axiosInstance.delete("favorite/" + itemId);
};

export const useAxiosQuery = (queryKey, url) => {
  return useQuery(queryKey, () => fetchData(url));
};

export const useAxiosDelete = () => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryCliente.invalidateQueries(["favoriteProduct"]);
    },
  });

  return mutate;
};
