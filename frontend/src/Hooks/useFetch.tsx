import React, { SetStateAction, useCallback } from "react";

type DataProps = {
  description: string;
  id: number;
  idCategory: number;
  idUser: number;
  images: Array<{
    id: number;
    fileName: string;
    idProdyct: number;
  }>;
  name: string;
  price: string;
  quantity: number;
};

const useFetch = () => {
  const [data, setData] = React.useState<DataProps | null>(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = useCallback(
    async (url: string, useLoading: boolean, options?: RequestInit) => {
      let response: any;
      let json: any;
      try {
        setError(null);
        if (useLoading) setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
      } catch (error) {
        json = null;
        setError(error);
      } finally {
        setData(json);
        if (useLoading) setLoading(false);
        return { response, json };
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
