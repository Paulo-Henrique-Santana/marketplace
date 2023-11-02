import React, { useContext } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { LocalStorageContext } from "../Context/LocalStorageContext";

// const { token } = useContext(LocalStorageContext);

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
});

export const GetProducts = (params) => {
  return useQuery(["products", params], async () => {
    let url = "/product?";

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

    const response = await axiosInstance.get(url);
    return response.data.items;
  });
};

const deleteFavorite = async (id) => {
  let url = "favorite/" + id;
  return await axiosInstance.delete(url);
};

export const DeleteFavoriteProduct = () => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryCliente.invalidateQueries(["products"]);
    },
  });

  return mutate;
};

const postFavorite = async (body) => {
  let url = "favorite";
  return await axiosInstance.post(url, JSON.stringify(body));
};

export const AddFavoriteProduct = () => {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      queryCliente.invalidateQueries(["products"]);
    },
  });

  return mutate;
};

export const API_URL = "http://localhost:3000/api/";

export function USER_POST_REGISTER(body) {
  return {
    url: API_URL + "user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_POST_LOGIN(body) {
  return {
    url: API_URL + "auth",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USERS_GET(params) {
  const api = {
    url: API_URL + "user",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };

  if (params && params.cpf) {
    api.url += `?cpf=${params.cpf}`;
  }
  if (params && params.email) {
    api.url += `?email=${params.email}`;
  }
  return api;
}

export function GET_CATEGORY() {
  return {
    url: API_URL + "category",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function GET_PRODUCTS(params) {
  const apiCategory = {
    url: API_URL + "product?",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };

  if (params) {
    if (params.idCategory) {
      apiCategory.url += `idCategory=${params.idCategory}&`;
    }
    if (params.search) {
      apiCategory.url += `name=${params.search}&`;
    }
    if (params.idLoggedUser) {
      apiCategory.url += `idLoggedUser=${params.idLoggedUser}&`;
    }
  }

  return apiCategory;
}

export function PRODUCTY_POST(body) {
  return {
    url: API_URL + "product",
    options: {
      method: "POST",
      body: body,
    },
  };
}

export function FAVORITES_PRODUCTY(body) {
  return {
    url: API_URL + "favorite",
    options: {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_FAVORITES_PRODUCTY(id) {
  return {
    url: API_URL + "favorite/" + id,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function GET_FAVORITES_PRODUCTY(id) {
  return {
    url: API_URL + "favorite?idUser=" + id,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
