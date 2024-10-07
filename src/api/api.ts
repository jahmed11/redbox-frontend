import axios, { AxiosResponse, AxiosError } from "axios";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 9000,
  headers: { "Content-Type": "application/json" },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("Error response:", error.response);

      const { status } = error.response;

      switch (status) {
        case 400:
          message.error("Bad Request. Please check your input and try again.");
          break;
        case 404:
          message.warning("Resource not found. Please try again later.");
          break;
        case 500:
          message.error("Server Error. Please try again later.");
          break;
        default:
          message.error("An unexpected error occurred. Please try again.");
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
      message.error(
        "Network error. Unable to reach the server. Please check your internet connection and try again."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      message.error("An unexpected error occurred. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
