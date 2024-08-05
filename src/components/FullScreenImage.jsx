import React from 'react'

const FullScreenImage = ({ imageUrl, setViewImageFullScreen, setFullScreenImageUrl }) => {
    return (
        <div className='absolute top-0 left-0 min-h-screen w-screen bg-black'>
            <div className='px-5 py-10'>
                <div className='text-end'> <button className='text-white' onClick={() => { setFullScreenImageUrl(""); setViewImageFullScreen(false); }}>close</button></div>
                <div className='m-auto w-[50%] h-[50%]'>
                    <img className='w-full h-full object-cover' src={imageUrl} alt="certificate" />
                </div>
            </div>
        </div>
    )
}

export default FullScreenImage