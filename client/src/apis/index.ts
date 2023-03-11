import axios, { AxiosRequestConfig } from "axios";
import { REACT_APP_API_KEY } from "../utils/env";

const api = axios.create({
    baseURL: REACT_APP_API_KEY,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    },
});

api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const authToken = JSON.parse(localStorage.getItem("auth")!)?.token;
        const newConfig = config;
        if (authToken) {
            newConfig.headers!.Authorization = `Bearer ${authToken}`;
        }
        return newConfig;
    },
    (error: Error) => {
        return Promise.reject(error);
    }
);

export default api;
