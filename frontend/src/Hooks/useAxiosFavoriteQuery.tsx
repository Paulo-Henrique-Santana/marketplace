import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
};

export type ApiResponse<T> = {
  data: T;
};

type PostDataParams<T> = {
  url: string;
  data: T;
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

export const postData = async <T,>({
  url,
  data,
}: PostDataParams<T>): Promise<T> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const useAxiosQueryGet = (queryKey: any, url: string, params?: any) => {
  return useQuery([queryKey, params], () => getData(url, params));
};

export const useAxiosQueryDelete = (key: string[]) => {
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

// ---------------------------------------------------------------- //
export const useGetRequest = (
  queryKey: string,
  url: string,
  params?: {
    idLoggedUser: number;
  }
) => {
  const getData = async (url: string, params: any) => {
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

  return useQuery([queryKey, params], () => getData(url, params));
};

export const usePostRequest = <T,>() => {
  const queryClient = useQueryClient();

  const postData = async ({ url, data }: PostDataParams<T>): Promise<T> => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  const mutation = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  return mutation;
};

export const useDeleteRequest = <T,>(key: string[]) => {
  const queryCliente = useQueryClient();

  const deleteData = async (itemId: number) => {
    await axiosInstance.delete("favorite/" + itemId, headers);
  };

  const mutation = useMutation(deleteData, {
    onSuccess: () => {
      queryCliente.invalidateQueries(key);
    },
  });

  return mutation;
};
