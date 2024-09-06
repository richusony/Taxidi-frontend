import React, { useEffect, useState } from 'react'
import HostNavbar from '../../components/HostNavBar'
import HostSideBar from '../../components/HostSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import HostProfileUpdate from '../../components/HostProfileUpdate';
import axiosInstance from '../../axiosConfig';
import ErrorToast from '../../components/ErrorToast';
import LineGraph from '../../components/LineGraph';
import { validateImageFile } from '../../utils/helper';

const HostProfile = () => {
  const [error, setError] = useState("");
  const [page, setPage] = useState('Profile');
  const [hostData, setHostData] = useState({});
  const [updateBox, setUpdateBox] = useState(false);
  const [chartData, setChartData] = useState(JSON.parse(localStorage.getItem("chartData")) || null)

  useEffect(() => {
    fetchHostDetails();
  }, []);

  const fetchHostDetails = async () => {
    try {
      const res = await axiosInstance.get("/host/profile");
      console.log(res?.data);
      setHostData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setError(error);
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axiosInstance.patch("/host/update-host-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setHostData(prevData => ({
        ...prevData,
        profileImage: res.data.profileImage
      }));
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  }


  return (
    <div className='relative px-5 pb-5 bg-[#EDEDED] flex'>
      <HostSideBar />

      <div className='w-[80%] max-h-screen overflow-y-scroll hideScrollBar'>
        {/* Navbar  */}
        <HostNavbar page={page} />

        <div className='mt-5 px-5'>
          <div className='relative px-5 py-5 bg-white rounded-xl shadow-md flex items-center gap-x-10 overflow-hidden'>
            {/* Image upload and view */}
            <div className='w-40 h-40 border border-[#593CFB] relative rounded-full overflow-hidden shadow-md'>
              <img className='w-full h-full object-cover rounded-full shadow-md' src={hostData?.profileImage} alt="profileImage" />
              <div className='absolute bottom-0 py-1 w-full text-center bg-opacity-50 bg-black text-white'>
                <label className='cursor-pointer' htmlFor='profileImage'>Upload</label>
                <input onChange={handleProfileImageChange} className='hidden w-full' type="file" name="profileImage" id="profileImage" />
              </div>
            </div>

            {/* Host Information */}
            {hostData && <div className='grid grid-cols-2 gap-y-5'>
              <div>
                <label className='text-gray-500 font-bold' htmlFor="">FullName</label>
                <p>{hostData?.fullname}</p>
              </div>
              <div>
                <label className='text-gray-500 font-bold' htmlFor="">Email</label>
                <p>{hostData?.email}</p>
              </div>
              <div>
                <label className='text-gray-500 font-bold' htmlFor="">Phone Number</label>
                <p>{hostData?.phone}</p>
              </div>
              <div>
                <label className='text-gray-500 font-bold' htmlFor="">License Number</label>
                <p>{hostData?.licenseNumber}</p>
              </div>
            </div>}


            <div onClick={() => setUpdateBox(true)} className='transition-all absolute right-0 top-0 h-full px-4 bg- hover:bg-[#593CFB] cursor-pointer bg-black text-white text-center flex justify-center items-center drop-shadow-lg'>
              <p>Edit <FontAwesomeIcon icon={faPencil} /></p>
            </div>
          </div>
        </div>

        <div className='mt-20 '>
          <h1 className='text-gray-500 uppercase font-bold'>Bookings</h1>
          <div className='mt-2 px-5 py-2 w-11/12 bg-white rounded-xl shadow-md'>
            <LineGraph chartData={chartData} />
          </div>
        </div>
        {updateBox && <HostProfileUpdate hostData={hostData} setUpdateBox={setUpdateBox} setHostData={setHostData} />}
      </div>
      <ErrorToast error={error} setError={setError} />
    </div>
  )
}

export default HostProfile