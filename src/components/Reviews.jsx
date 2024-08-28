import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SuccessToast from '../components/SuccessToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({ vehicleId, vehicleRegistrationNumber, user, setRatingData }) => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);
    const [reviewMsg, setReviewMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [rating, setRating] = useState({
        cleanliness: null,
        maintenance: null,
        convenience: null,
        timing: null
    });

    useEffect(() => {
        getAllReviews();
    }, [])

    const handleSubmitReview = async () => {
        if (!user) return navigate("/login");

        const reqData = {
            vehicleId,
            reviewMsg,
            rating
        }
        console.log(reqData);
        try {
            const res = await axiosInstance.post("/post-reivew", reqData);
            setSuccessMsg("review posted");
        } catch (error) {
            console.log(error);
        }
    }

    const getAllReviews = async () => {
        const reqData = {
            vehicleRegistrationNumber,
        }
        // console.log(reqData);
        try {
            const res = await axiosInstance.post("/vehicle-reivews", reqData);
            console.log(res?.data);
            setReviews(res?.data?.reviews);
            setRatingData(res?.data?.rating[0]);
        } catch (error) {
            console.log(error.message);
        }
    }

    const formatReviewDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className='mt-10'>
            <h1 className='md:text-xl font-semibold'>Reviews</h1>

            {reviews?.length > 0?<div className='mt-2 h-52 md:h-96 overflow-y-scroll hideScrollBar'>
                {reviews?.map((review) => (
                    <div key={review?._id} className='my-2 border-b pb-5 flex'>
                        <div className='w-12 h-12 rounded-full'><img className='w-full h-full object-cover rounded-full' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" /></div>
                        <div className='ml-4'>
                            {/* <span><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faStar} /></span> */}
                            <h1 className='my-2'>{review?.userId?.firstName + " " + review?.userId?.secondName}<span className='ml-2 text-sm text-gray-500'>{formatReviewDate(review?.createdAt)}</span></h1>
                            <p className=''>{review?.reviewMessage}</p>
                        </div>
                    </div>
                ))
                }
            </div>: <h1 className='text-gray-500'>No reviews yet</h1>}
            <div className='relative'>
                <div className={`transition-all delay-150 ease-in z-0 flex ${reviewMsg == "" ? "translate-y-full invisible" : "visible"} items-center py-2 text-[#593CFB]`}>
                    <div className='mx-1 border border-[#593CFB] px-2 py-1 w-fit rounded-xl shadow-md'>
                        <span className='mr-2'>Cleanliness</span>
                        <select onChange={(e) => setRating({ ...rating, cleanliness: e.target.value })} className='bg-transparent outline-none' name="cleanliness" id="cleanliness">
                            <option value="0"></option>
                            <option value="5">5 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="4">4 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="3">3 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="2">2 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="1">1 <FontAwesomeIcon icon={faStar} /></option>
                        </select>
                    </div>
                    <div className='mx-1 border border-[#593CFB] px-2 py-1 w-fit rounded-xl shadow-md'>
                        <span className='mr-2'>Maintenance</span>
                        <select onChange={(e) => setRating({ ...rating, maintenance: e.target.value })} className='bg-transparent outline-none' name="maintenance" id="maintenance">
                            <option value="0"></option>
                            <option value="5">5 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="4">4 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="3">3 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="2">2 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="1">1 <FontAwesomeIcon icon={faStar} /></option>
                        </select>
                    </div>
                    <div className='mx-1 border border-[#593CFB] px-2 py-1 w-fit rounded-xl shadow-md'>
                        <span className='mr-2'>Convenience</span>
                        <select onChange={(e) => setRating({ ...rating, convenience: e.target.value })} className='bg-transparent outline-none' name="convenience" id="convenience">
                            <option value="0"></option>
                            <option value="5">5 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="4">4 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="3">3 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="2">2 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="1">1 <FontAwesomeIcon icon={faStar} /></option>
                        </select>
                    </div>
                    <div className='mx-1 border border-[#593CFB] px-2 py-1 w-fit rounded-xl shadow-md'>
                        <span className='mr-2'>Timing</span>
                        <select onChange={(e) => setRating({ ...rating, timing: e.target.value })} className='bg-transparent outline-none' name="accuracy" id="accuracy">
                            <option value="0"></option>
                            <option value="5">5 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="4">4 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="3">3 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="2">2 <FontAwesomeIcon icon={faStar} /></option>
                            <option value="1">1 <FontAwesomeIcon icon={faStar} /></option>
                        </select>
                    </div>
                </div>
                <div className='flex z-50'>
                    <textarea defaultValue={reviewMsg} className='outline-none border-2 w-full border-[#593CFB] px-2 py-1 rounded' onChange={(e) => setReviewMsg(e.target.value)} placeholder='write something...' name="reviewMsg" id="reviewMsg"></textarea>
                    <div className='flex justify-center items-center'><button onClick={handleSubmitReview} className='transition delay-150 ease-linear ml-4 px-4 py-3 bg-[#593CFB] hover:scale-105 rounded-full shadow-md'><FontAwesomeIcon className='text-white' icon={faPaperPlane} /></button></div>
                </div>
                <SuccessToast msg={successMsg} setSuccessMsg={setSuccessMsg} />
            </div>
        </div>
    )
}

export default React.memo(Reviews);