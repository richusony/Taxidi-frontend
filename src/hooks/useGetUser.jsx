import { useState } from 'react'
import axiosInstance from '../axiosConfig';

const useGetUser = () => {
    const [userData, setUserData] = useState(null);
    const getUserDetails = async () => {
        try {
            const res = await axiosInstance.get('/profile');
            setUserData(res.data.user);
            if (res.status !== 200) window.location.href = "/login";
        } catch (error) {
            window.location.href = "/login";
            console.error('Error fetching profile:', error);
        }
    };
    getUserDetails();
  return userData
}

export default useGetUser