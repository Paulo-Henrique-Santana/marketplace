import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { axiosInstance, headers } from "../Api";

export type ApiResponse<T> = {
  data: T;
};

type PostDataParams<T> = {
  url: string;
  data: T;
};

type GetDataParams = {
  idCategory?: number;
  search?: string;
  idLoggedUser?: number;
};

export const useGetRequest = <T,>(
  url: string,
  queryKey?: string,
  params?: GetDataParams
) => {
  const getData = async <T,>(
    url: string,
    params?: GetDataParams
  ): Promise<T> => {
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

  return useQuery<T>([queryKey, params], () => getData<T>(url, params));
};

export const usePostRequest = <T,>() => {
  const queryClient = useQueryClient();

  const postData = async ({ url, data }: PostDataParams<T>) => {
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

export const useDeleteRequest = (key: string[]) => {
  const queryCliente = useQueryClient();

  const deleteData = async (itemId: number) => {
    await axiosInstance.delete(`favorite/${itemId}`, headers);
  };

  const mutation = useMutation(deleteData, {
    onSuccess: () => {
      queryCliente.invalidateQueries(key);
    },
  });

  return mutation;
};
