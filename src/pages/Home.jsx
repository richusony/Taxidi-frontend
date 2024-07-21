import axiosInstance from '../axiosConfig';
import useOnline from '../hooks/useOnline';
import BecomeHost from '../components/BecomeHost';
import ErrorToast from '../components/ErrorToast';
import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/DefaultNavbar';
import { CAR_COLLECTIONS, HOME_BG_IMAGE_URL } from '../constants';

const Home = () => {
    const isOnline = useOnline();
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getAllBrands();
    }, []);

    const getAllBrands = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        try {
            const res = await axiosInstance.get("/brands");
            setBrands(res.data);
        } catch (error) {
            // console.error('Error fetching brands:', error);
        }
    }
    return (
        <div className='overflow-x-hidden'>
            {/* Announcements */}
            <div className='py-2 bg-[#FBF9F6] text-center'>
                <p className='text-gray-500 text-sm'>Taxidi launched on Kozhikode!!</p>
            </div>

            {/* Navbar  */}
            <DefaultNavbar />

            {/* Date selection */}
            <div className="h-screen relative">
                <img className='h-full w-full object-cover' src={HOME_BG_IMAGE_URL} alt="" />

                <div className='px-5 py-8 w-10/12 absolute top-10 left-[8%] bg-white rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md'>
                    <div>
                        <h2 className='font-semibold'>Start Date and Time</h2>
                        <div className='mt-2'>
                            <input type="datetime-local" placeholder='date and time' className='px-4 py-2 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='mt-4 md:mt-0 md:ml-8'>
                        <h2 className='font-semibold'>End Date and Time</h2>
                        <div className='mt-2'>
                            <input type="datetime-local" className='px-4 py-2 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='mt-4 md:mt-0 md:ml-8'>
                        <button className='px-8 py-2 bg-[#593CFB] text-white rounded-lg'>Search</button>
                    </div>
                </div>
            </div>

            {/* Text  */}
            <div className='px-10 py-14 text-center'>
                <div className='my-5'>
                    <h1 className='text-3xl font-bold text-gray-700'>Skip the rental car counters</h1>
                    <h3 className='mt-2'>Rent just about any car, just about anywhere</h3>
                </div>
            </div>

            {/* Explore Cars for any occasion */}
            <div className='py-10 md:pr-10 bg-[#E8E6E6] flex flex-col md:flex-row justify-center md:justify-evenly items-center'>
                <div className='w-96 rounded'>
                    <img className='w-full h-full object-cover rounded' src={CAR_COLLECTIONS} alt="car-collections" />
                </div>

                <div className='mt-5 md:mt-0'>
                    <h1 className='text-3xl font-bold text-gray-700'>Explore cars for any <br /> occasion</h1>
                    <p className='mt-3'>Our incredible selection of cars makes it <br />
                        easy to find a ride anytime, anywhere.</p>
                    <button className='mt-3 py-2 px-4 bg-[#593CFB] text-white rounded'>Explore cars</button>
                </div>
            </div>

            {/* Browse by Make */}
            <div className='mt-5 px-5 md:px-10 py-5'>
                <h1 className='font-bold text-gray-700 text-xl'>Browse by make</h1>

                <div className='mt-2 mx-auto py-2 px-2 w-[98%] flex overflow-y-hidden overflow-x-scroll hideScrollBar'>

                    {brands.length > 0 && brands.map((brand) => (
                        <div key={brand._id} className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                            <div>
                                <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                            </div>
                            <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>{brand.brandName}</h1>
                        </div>
                    ))}

                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    {/* Repeat similar divs for other items */}
                </div>

            </div>

            {/* Become a host | Book a car */}
            <div className='mt-5 py-2 px-5 flex justify-center items-center'>
                {/* <img className='w-full h-full' src="../assets/images/becomehost.jpg" alt="image" /> */}
                <BecomeHost />
            </div>

            {/* Footer */}
            <footer className='mt-10 px-5 md:px-10 py-10 bg-[#F2F1F1] grid grid-cols-3 gap-x-5'>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Location</h1>
                    <div className='mt-5'>
                        <h3>Kasargod</h3>
                        <h3>Kannur</h3>
                        <h3>Kozhikode</h3>
                        <h3>Malapuram</h3>
                        <h3>Kozhikode</h3>
                    </div>
                </div>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Social Media</h1>
                    <div className='mt-5'>
                        <h3>Instagram</h3>
                        <h3>Facebook</h3>
                        <h3>Twitter/X</h3>
                        <h3>Median</h3>
                    </div>
                </div>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Brands</h1>
                    <div className='mt-5'>
                        <h3>Maruti Suzuki</h3>
                        <h3>Mahindra</h3>
                        <h3>Renault</h3>
                        <h3>Volkswagen</h3>
                        <h3>Toyota</h3>
                        <h3>Hyundai</h3>
                        <h3>Honda</h3>
                    </div>
                </div>
            </footer>

            <ErrorToast error={error} setError={setError}/>
        </div>
    )
}

export default Home