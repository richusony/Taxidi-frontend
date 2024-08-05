import axios from "axios";

const domain =  import.meta.env.VITE_BACKEND;

const axiosInstance = axios.create({
  baseURL: `${domain}`, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedUser = localStorage.getItem("user");
      const currentRoleData =
        storedUser != "undefined" ? JSON.parse(storedUser) : null;
      console.log("axios Interpreter", currentRoleData);
      const refreshTokenEndpoint =
        currentRoleData.role == "user"
          ? "/refresh-token"
          : `/${currentRoleData.role}/refresh-token`;
      try {
        const { data } = await axiosInstance.post(refreshTokenEndpoint);
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const cancelTokenSource = axios.CancelToken.source();

export default axiosInstance;
