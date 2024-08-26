import React, { useState } from 'react';
import useOnline from '../hooks/useOnline';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddBrand = ({ setError, setAddBrand, setSuccess }) => {
    const isOnline = useOnline();
    const [formData, setFormData] = useState({
        brandName: '',
        brandImage: null
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (id === 'brandImage') {
            setFormData({
                ...formData,
                [id]: files[0] // Set the file object for brandImage
            });
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!formData.brandImage || !formData.brandName) {
            setError("Fill All the fields");
            return;
        }

        try {
            const formDataForUpload = new FormData();
            formDataForUpload.append("brandName", formData.brandName);
            formDataForUpload.append("brandImage", formData.brandImage);

            const res = await fetch(`${import.meta.env.VITE_BACKEND}/admin/add-brand`, {
                method: 'POST',
                credentials: 'include',
                body: formDataForUpload
            });

            if (!res.ok) {
                const data = await res.json();
                // console.log(data);
                setError(data?.error);
            }

            if (res?.status == 201) {
                setSuccess("Brand Added");
                setAddBrand(false)
            }

            // Handle success (e.g., clear form, show success message, etc.)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='absolute top-[20%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Brand <FontAwesomeIcon icon={faCar} /></h1>
                <button onClick={() => setAddBrand(false)} className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="brandName">Brand</label>
                        <input type="text" id='brandName' onChange={handleChange} name='brandName' className='border-2  px-2 py-1 rounded' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="brandImage">Brand Image</label>
                        <input type="file" id='brandImage' onChange={handleChange} name='brandImage' className='border-2  px-2 py-1 rounded' />
                    </div>
                </div>

            <div className='mt-5 text-end'><button type="submit" className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
            </form>
        </div>
    );
}

export default AddBrand;
