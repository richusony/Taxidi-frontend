import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
const navigate = useNavigate();
    return (
        <div className='text-center'>
            <h1 className='mt-5 text-center font-semibold'>404 Page Not Found</h1>
            <button className='mt-5 px-4 py-2 bg-violet-600 text-white rounded shadow-md' onClick={()=>navigate("/")}>Home page</button>
        </div>
    )
}

export default NotFoundPage