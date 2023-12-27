import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { axiosInstance } from "../Api";

export const useAxiosGet = <T,>(url: string, queryKey: string) => {
  const getProduct = async <T,>(url: string): Promise<AxiosResponse<T>> => {
    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery<AxiosResponse<T>, Error, T>(queryKey, () =>
    getProduct<T>(url)
  );
};
