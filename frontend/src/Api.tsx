import axios from "axios";
import { useContext, useEffect } from "react";
import { LocalStorageContext } from "./Context/LocalStorageContext";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const axiosHeaders = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
