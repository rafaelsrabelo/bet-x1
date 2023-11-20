import { deleteCookie, getCookie } from "@/utils/cookies";
import axios from "axios";
import router from 'next/router';

export const api = axios.create({
    baseURL: "http://localhost:3001/"
});

api.interceptors.request.use(
    config => {
        const token = getCookie("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response?.status === 401) {
          deleteCookie("auth_token");
        //   useStore.getState().logout();
          router.push('/login');
        }
        return Promise.reject(error);
      }
)