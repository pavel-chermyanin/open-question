import axios from "axios";
import { ACCESS_TOKEN, BASE_URL_OPEN_QUESTION } from "@/app/config/constants.ts";
import {RouteTypes} from "@/app/types/routes.types.ts";

// Retry logic constants
const MAX_RETRIES = 2; // Number of retry attempts (including the initial request)
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL_OPEN_QUESTION,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'Accept-Language': 'ru',
      // "ngrok-skip-browser-warning": 'true',
    },
    // withCredentials: true,
  });

  // Add request interceptor to include Authorization token
  // instance.interceptors.request.use((config) => {
  //   const token = localStorage.getItem(ACCESS_TOKEN);
  //   if (token) {
  //     // config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  // Add response interceptor to handle errors and retries
  instance.interceptors.response.use(
    (response) => response, // If the request is successful, return the response
    async (error) => {
      const originalRequest = error.config;

      // Если сервер вернул ошибку, проверяем статус
      if (error.response.status === 401) {
        // console.log(error.response)
        // Прокидываем ошибку выше
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = RouteTypes.AUTH;
        return Promise.reject(new Error(error.response.data.detail));
      }

      // Ensure `_retryCount` is set for tracking retries
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      // If maximum retries have been reached, stop retrying
      if (originalRequest._retryCount >= MAX_RETRIES) {
        return Promise.reject(new Error("Maximum retries reached"));
      }

      // Increment the retry count
      originalRequest._retryCount += 1;

      // Handle network errors or socket issues (e.g., ERR_NETWORK)
      if (!error.response || error.code === 'ERR_NETWORK') {
        console.warn(
          `Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) due to network error...`
        );
        await delay(RETRY_DELAY * originalRequest._retryCount); // Delay with backoff
        return instance(originalRequest); // Retry the request
      }

      // Handle timeouts
      if (error.code === 'ECONNABORTED') {
        console.warn(
          `Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) due to timeout...`
        );
        await delay(RETRY_DELAY * originalRequest._retryCount); // Delay with backoff
        return instance(originalRequest); // Retry the request
      }


      // For other cases, reject the error
      return Promise.reject(error);
    }
  );

  // Delay function to introduce wait between retries
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return instance;
};

export const openQuestionClient = createAxiosInstance();
