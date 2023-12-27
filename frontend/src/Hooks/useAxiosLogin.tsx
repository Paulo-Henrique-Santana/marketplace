import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../Api";
import { AxiosResponse } from "axios";

export const usePostLogin = () => {
  const postData = async ({
    url,
    data,
  }: {
    url: string;
    data: {
      name?: string;
      email: string;
      password: string;
      cpf?: string;
    };
  }) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  const mutation = useMutation(postData);

  return mutation;
};

export const useAxiosGetCPF = (
  url: string,
  queryKey: string,
  params?: any
) => {
  const getData = async (url: string, params?: any) => {
    if (params && params.cpf) {
      url += `?cpf=${params.cpf}`;
    }
    if (params && params.email) {
      url += `?email=${params.email}`;
    }

    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery([queryKey, params], () => getData(url, params));
};
