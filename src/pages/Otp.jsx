import React from 'react'

const Otp = () => {
    return (
        <div className='px-5 py-5 grid grid-cols-2 items-center'>
            <div className='mx-auto text-center'>
                <div className='mx-auto'>
                    <h1 className='text-2xl font-bold text-blue-500'>Enter The Code</h1>
                    <p className='mt-5 w-[50%] mx-auto text-gray-500'>Enter The Code That we send to your email <span className='text-blue-500'>sonyrichu4@gmail.com</span> be careful not to share code with anyone</p>
                    <input type="text" inputMode='numeric' className='mt-5 px-4 py-2 border-2 rounded' />
                    <div className='mt-5'><button className='px-6 py-2 bg-blue-500 text-white rounded'>Verify</button></div>
                </div>
            </div>

            <div className=' rounded'>
                <div className='w-[70%] bg-transparent'>
                    <img className='w-full h-full rounded bg-transparent' src="/src/assets/images/otpimage.jpg" alt="otp-image" />
                </div>
            </div>
        </div>
    )
}

export default Otp