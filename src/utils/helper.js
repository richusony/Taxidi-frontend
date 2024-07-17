import axiosInstance from "../axiosConfig.js";
import { kannurDistrictPincodes } from "../constants";

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (phone) => {
  const re = /^\d{10}$/;
  return re.test(String(phone));
};

export function isKannur(pin) {
  if (kannurDistrictPincodes.has(pin)) {
    return true;
  } else {
    return false;
  }
}

export const validateAdmin = async () => {
  try {
    const res = await axiosInstance.get("/admin");
    console.log(res.status);
    if (res.status !== 200) window.location.href = "/admin-login";
  } catch (error) {
    window.location.href = "/admin-login";
  }
};

export const handleAdminLogOut = async () => await axiosInstance.get("/admin/logout").then(() => window.location.reload());

export const handleLogOut = async () => await axiosInstance.get("/logout").then(() => window.location.reload());

export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
};