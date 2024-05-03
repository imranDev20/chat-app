import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getCustomErrorMessage } from "../_utils/utils";
import { toast } from "react-toastify";

interface ErrorResponseData {
  success: boolean;
  message: string;
  error?: string;
}

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with response data
    return response;
  },
  (error: AxiosError<ErrorResponseData>) => {
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { success, message, error: errorMessage } = error.response.data;

      if (!success) {
        toast.error(
          message ||
            errorMessage ||
            getCustomErrorMessage(error.response.status)
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error(error.message);
    }

    // return Promise.reject(error);
  }
);

export default http;
