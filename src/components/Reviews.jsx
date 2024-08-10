import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SuccessToast from '../components/SuccessToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({ vehicleId, vehicleRegistrationNumber, user }) => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);
    const [reviewMsg, setReviewMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        getAllReviews();
    }, [])

    const handleSubmitReview = async () => {
        if (!user) return navigate("/login");

        const reqData = {
            vehicleId,
            reviewMsg
        }
        try {
            const res = await axiosInstance.post("/post-reivew", reqData);
            setSuccessMsg("review posted");
        } catch (error) {
            console.log(error);
        }
    }

    const getAllReviews = async () => {
        const reqData = {
            vehicleRegistrationNumber
        }
        console.log(reqData);
        try {
            const res = await axiosInstance.get("/vehicle-reivews", reqData);
            setReviews(res?.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='mt-10'>
            <h1 className='text-xl font-semibold'>Reviews</h1>

            <div className='mt-2 h-96 overflow-y-scroll hideScrollBar'>
                {reviews?.map((review) => (
                    <div className='my-2 border-b pb-5 flex'>
                        <div className='w-12 h-12 rounded-full'><img className='w-full h-full object-cover rounded-full' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" /></div>
                        <div className='ml-4'>
                            <span><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /></span>
                            <h1 className='my-2'>{review?.userId?.firstName} <span className='text-gray-500'>June 6, 2024</span></h1>
                            <p className='w-3/4'>{review?.reviewMessage}</p>
                        </div>
                    </div>
                ))
                }

                <div className='my-2 border-b pb-5 w-fit flex'>
                    <div className='w-16 h-12 rounded-full'><img className='w-full h-full object-cover rounded-full' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" /></div>
                    <div className='ml-4'>
                        <span><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /></span>
                        <h1 className='my-2'>Andrew <span className='text-gray-500'>June 6, 2024</span></h1>
                        <p className='w-3/4'>Great service, easy and convenient. Awesome value, car was smooth and super clean. Nice guys. Definitely would use their services again!</p>
                    </div>
                </div>
                <div className='my-2 border-b pb-5 w-fit flex'>
                    <div className='w-16 h-12 rounded-full'><img className='w-full h-full object-cover rounded-full' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" /></div>
                    <div className='ml-4'>
                        <span><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /></span>
                        <h1 className='my-2'>Andrew <span className='text-gray-500'>June 6, 2024</span></h1>
                        <p className='w-3/4'>Great service, easy and convenient. Awesome value, car was smooth and super clean. Nice guys. Definitely would use their services again!</p>
                    </div>
                </div>
            </div>
            <div className='flex relative'>
                <textarea className='outline-none border-2 w-full border-[#593CFB] px-2 py-1 rounded' onChange={(e) => setReviewMsg(e.target.value)} placeholder='write something...' name="reviewMsg" id="reviewMsg">{reviewMsg}</textarea>
                <div className='flex justify-center items-center'><button onClick={handleSubmitReview} className='transition delay-150 ease-linear ml-4 px-4 py-3 bg-[#593CFB] hover:scale-105 rounded-full shadow-md'><FontAwesomeIcon className='text-white' icon={faPaperPlane} /></button></div>
                <SuccessToast msg={successMsg} setSuccessMsg={setSuccessMsg} />
            </div>
        </div>
    )
}

export default React.memo(Reviews);