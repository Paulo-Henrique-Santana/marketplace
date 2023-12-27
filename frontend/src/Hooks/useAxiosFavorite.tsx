import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../Api";

export const useAxiosPostFavorite = () => {
  const queryClient = useQueryClient();
  const favoritePostData = async ({ url, data }: any) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  const mutation = useMutation(favoritePostData, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  return mutation;
};

export const useAxiosDeleteFavorite = (key: string[]) => {
  const queryCliente = useQueryClient();

  const favoriteDeleteData = async (itemId: number) => {
    await axiosInstance.delete(`favorite/${itemId}`);
  };

  const mutation = useMutation(favoriteDeleteData, {
    onSuccess: () => {
      queryCliente.invalidateQueries(key);
    },
  });

  return mutation;
};
