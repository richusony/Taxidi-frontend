import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosInstance from '../axiosConfig'
import React, { useState } from 'react'

const AddBody = ({setError, setAddBody}) => {
    const [formData, setFormData] = useState({
        bodyType: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          const res = await axiosInstance.post("/admin/add-body", formData);  
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    return (
        <div className='absolute top-[20%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Body <FontAwesomeIcon icon={faCar} /></h1>
                <button onClick={()=>setAddBody(false)} className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col'>
                    <label htmlFor="bodyType">Body Type</label>
                    <input type="text" id='bodyType' onChange={handleChange} name='bodyType' className='border-2  px-2 py-1 rounded' />
                </div>

                {/* <div className='flex flex-col'>
                    <label htmlFor="brandImage">Body Image URL</label>
                    <input type="text" id='brandImage' onChange={handleChange} name='brandImage' className='border-2  px-2 py-1 rounded' />
                </div> */}

            </form>
            <div className='mt-5 text-end'><button onClick={handleSubmit} className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
        </div>
    )
}

export default AddBody