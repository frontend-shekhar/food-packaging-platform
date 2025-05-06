import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

axiosInstance.interceptors.request.use(async (config: any) => {
  const jwt = await "";

  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // showErrorToastMessage("Unauthorized User");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
