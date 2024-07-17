import axios from 'axios';
import React, { useState } from 'react';
import useOnline from '../hooks/useOnline';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddBrand = ({setError, setAddBrand}) => {
    const isOnline = useOnline();
    const [formData, setFormData] = useState({
        brandName: '',
        brandImage: ''
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
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if(!formData.brandImage || !formData.brandName) {
            setError("Fill All the fields")
        }
        const res = await axios.post("http://localhost:8080/admin/add-brand", formData);
    }

    return (
        <div className='absolute top-[20%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Brand <FontAwesomeIcon icon={faCar} /></h1>
                <button onClick={()=>setAddBrand(false)} className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col'>
                    <label htmlFor="brandName">Brand</label>
                    <input type="text" id='brandName' onChange={handleChange} name='brandName' className='border-2  px-2 py-1 rounded' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="brandImage">Brand Image URL</label>
                    <input type="text" id='brandImage' onChange={handleChange} name='brandImage' className='border-2  px-2 py-1 rounded' />
                </div>

            </form>
            <div className='mt-5 text-end'><button onClick={handleSubmit} className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
        </div>
    )
}

export default AddBrand