import { useQuery } from "react-query";
import { axiosInstance } from "../Api";
import { AxiosResponse } from "axios";

export const useAxiosQueryGet = <T,>(
  url: string,
  queryKey: string,
  params?: any
) => {
  const getData = async (url: string, params?: any) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value!.toString());
    });

    const fullUrl = queryParams.toString()
      ? `${url}?${queryParams.toString()}`
      : url;

    const response = await axiosInstance.get(fullUrl);
    return response.data;
  };

  return useQuery<AxiosResponse<T>, Error, T>([queryKey, params], () =>
    getData(url, params)
  );
};

export const useAxiosQueryGet2 = <T,>(url: string, params?) => {
  const getData = async (url: string, params?: any) => {
    const response = await axiosInstance.get(url + params);
    return response.data;
  };

  return useQuery<AxiosResponse<T>, Error, T>(["existence", params], () =>
    getData(url, params)
  );
};

const checkIfExists = async (url) => {
  console.log(url);

  try {
    // Make an Axios request to check if CPF and email exist in the database
    const response = await axiosInstance.get(`user?${url}`);

    // console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error checking existence:", error);
    return false; // Handle error appropriately
  }
};

export const useCheckExistence = (value) => {
  // console.log(value);

  return useQuery(["existence", value], () => checkIfExists(value));
};
