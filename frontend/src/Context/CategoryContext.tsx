import React, { createContext, useEffect, useState } from "react";
import { GET_CATEGORY } from "../Api/Index";
import useFetch from "../Hooks/useFetch";
import { useGetRequest } from "../Hooks/useAxiosFavoriteQuery";

type CategoryContextProviderProps = {
  children: React.ReactNode;
};

type CategoryProps = {
  id: number;
  name: string;
};

type CategoryContextProps = {
  category?: CategoryProps[];
  setCategory?: React.Dispatch<React.SetStateAction<never[]>>;
  categoryName?: any | undefined;
  setCategoryName?: React.Dispatch<React.SetStateAction<never[]>>;
};

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export const CategoryProvider = ({
  children,
}: CategoryContextProviderProps) => {
  const { request } = useFetch();
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const { url, options } = GET_CATEGORY();
      const { json } = await request(url, true, options);
      setCategory(json);

      // console.log(json);
    };
    getCategory();
  }, [request]);

  // useEffect(() => {
  //   const { data, isLoading } = useGetRequest("category", "category");
  //   setCategory(data);
  // }, []);

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
