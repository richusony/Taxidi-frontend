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

export const validateHost = async () => {
  try {
    const res = await axiosInstance.get("/host");
    console.log(res.status);
    if (res.status !== 200) window.location.href = "/host-login";
  } catch (error) {
    window.location.href = "/host-login";
  }
};

export const handleAdminLogOut = async () =>
  await axiosInstance.get("/admin/logout").then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  });

export const handleHostLogOut = async () =>
  await axiosInstance.get("/host/logout").then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  });

export const handleLogOut = async () =>
  await axiosInstance.get("/logout").then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  });

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  // Check if the hours are less than 12 to determine am/pm
  if (hours < 12) {
    return `${hours}:${minutes} am`; // Return time in am format
  } else {
    // Convert 24-hour format to 12-hour format for pm
    const pmHours = hours === 12 ? hours : hours - 12;
    return `${pmHours}:${minutes} pm`; // Return time in pm format
  }
}

// Function to get today's date
export function getTodayDate() {
  const today = new Date();
  return formatDate(today);
}

// Function to get yesterday's date
export function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return formatDate(yesterday);
}

// Helper function to pad single digits with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0"); // Pad with leading zero if needed
}

// Function to format date as "Wed Apr 10 2024" format
function formatDate(date) {
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
