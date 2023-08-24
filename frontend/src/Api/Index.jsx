import React from "react";

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
  if (params && params.idCategory) {
    apiCategory.url += `idCategory=${params.idCategory}&`;
  }

  apiCategory;
  return apiCategory;
}

export function PHOTO_POST(body) {
  return {
    url: API_URL + "product",
    options: {
      method: "POST",
      body: body,
    },
  };
}
